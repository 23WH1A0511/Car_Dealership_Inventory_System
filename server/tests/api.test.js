import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Vehicle from '../src/models/Vehicle.js';
import Order from '../src/models/Order.js';

let mongo, adminToken, userToken, vehicleId;
beforeAll(async () => { process.env.JWT_SECRET = 'test-secret'; process.env.CLIENT_URL = 'http://localhost:5173'; mongo = await MongoMemoryServer.create(); await mongoose.connect(mongo.getUri()); });
beforeEach(async () => { await Order.deleteMany({}); await User.deleteMany({}); await Vehicle.deleteMany({}); const admin = await request(app).post('/api/auth/register').send({ name: 'Admin', email: 'admin@test.com', password: 'secret1' }); await User.findByIdAndUpdate(admin.body.user.id, { role: 'admin' }); adminToken = (await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'secret1' })).body.token; userToken = (await request(app).post('/api/auth/register').send({ name: 'Driver', email: 'user@test.com', password: 'secret1' })).body.token; const car = await request(app).post('/api/vehicles').set('Authorization', `Bearer ${adminToken}`).send({ make: 'Tesla', model: 'Model Y', category: 'Electric', price: 5000000, quantity: 2, year: 2024 }); vehicleId = car.body._id; });
afterAll(async () => { await mongoose.disconnect(); await mongo.stop(); });

describe('authentication', () => {
  it('registers a user and returns a JWT', async () => { const res = await request(app).post('/api/auth/register').send({ name: 'New User', email: 'new@test.com', password: 'secret1' }); expect(res.status).toBe(201); expect(res.body.token).toBeTruthy(); expect(res.body.user.password).toBeUndefined(); });
  it('rejects incorrect credentials', async () => { const res = await request(app).post('/api/auth/login').send({ email: 'user@test.com', password: 'wrong' }); expect(res.status).toBe(401); });
});
describe('inventory', () => {
  it('requires an access token to view inventory', async () => { expect((await request(app).get('/api/vehicles')).status).toBe(401); });
  it('allows an admin to create and a user to search vehicles', async () => { const res = await request(app).get('/api/vehicles/search?q=tes').set('Authorization', `Bearer ${userToken}`); expect(res.status).toBe(200); expect(res.body).toHaveLength(1); expect(res.body[0].model).toBe('Model Y'); });
  it('creates an order and atomically decrements quantity when purchasing', async () => { const res = await request(app).post(`/api/vehicles/${vehicleId}/purchase`).set('Authorization', `Bearer ${userToken}`); expect(res.status).toBe(201); expect(res.body.vehicle.quantity).toBe(1); expect(res.body.order.status).toBe('Pending'); });
  it('lets admins view orders but blocks status updates from regular users', async () => { const purchase = await request(app).post(`/api/vehicles/${vehicleId}/purchase`).set('Authorization', `Bearer ${userToken}`); const orders = await request(app).get('/api/orders').set('Authorization', `Bearer ${adminToken}`); expect(orders.body).toHaveLength(1); const result = await request(app).patch(`/api/orders/${purchase.body.order._id}/status`).set('Authorization', `Bearer ${userToken}`).send({ status: 'Confirmed' }); expect(result.status).toBe(403); });
  it('does not allow a regular user to delete inventory', async () => { expect((await request(app).delete(`/api/vehicles/${vehicleId}`).set('Authorization', `Bearer ${userToken}`)).status).toBe(403); });
});
