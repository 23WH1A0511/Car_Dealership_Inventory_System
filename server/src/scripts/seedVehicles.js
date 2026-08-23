import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Vehicle from '../models/Vehicle.js';

const vehicles = [
  { make: 'Porsche', model: 'Taycan 4S', category: 'Electric', price: 18500000, quantity: 3, year: 2024, color: 'Ice Grey Metallic', featured: true, image: 'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Range Rover', model: 'Velar Dynamic', category: 'SUV', price: 11200000, quantity: 4, year: 2024, color: 'Santorini Black', featured: true, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85' },
  { make: 'BMW', model: 'M4 Competition', category: 'Coupe', price: 15800000, quantity: 2, year: 2023, color: 'Brooklyn Grey', image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Mercedes-Benz', model: 'S 580 4MATIC', category: 'Luxury', price: 22000000, quantity: 2, year: 2024, color: 'Obsidian Black', featured: true, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Audi', model: 'RS e-tron GT', category: 'Electric', price: 19500000, quantity: 3, year: 2024, color: 'Tango Red', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Land Rover', model: 'Defender 110', category: 'SUV', price: 12500000, quantity: 5, year: 2024, color: 'Pangea Green', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Lexus', model: 'RX 500h', category: 'SUV', price: 9800000, quantity: 3, year: 2024, color: 'Sonic Titanium', image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Ford', model: 'Mustang GT', category: 'Coupe', price: 7600000, quantity: 1, year: 2023, color: 'Race Red', image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Volvo', model: 'XC90 Recharge', category: 'Luxury', price: 11000000, quantity: 4, year: 2024, color: 'Denim Blue', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Tata', model: 'Nexon EV Max', category: 'Electric', price: 1950000, quantity: 8, year: 2024, color: 'Pristine White', image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Mahindra', model: 'XUV700 AX7', category: 'SUV', price: 2700000, quantity: 6, year: 2024, color: 'Midnight Black', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Hyundai', model: 'Tucson Platinum', category: 'SUV', price: 3600000, quantity: 4, year: 2024, color: 'Amazon Grey', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Honda', model: 'City e:HEV', category: 'Sedan', price: 2100000, quantity: 7, year: 2024, color: 'Golden Brown', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Kia', model: 'Seltos X-Line', category: 'SUV', price: 2400000, quantity: 5, year: 2024, color: 'Matte Graphite', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Skoda', model: 'Slavia Style', category: 'Sedan', price: 1850000, quantity: 6, year: 2024, color: 'Lava Blue', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Toyota', model: 'Innova Hycross', category: 'Luxury', price: 3200000, quantity: 5, year: 2024, color: 'Silver Metallic', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85' },
  { make: 'Jeep', model: 'Compass Longitude', category: 'SUV', price: 3400000, quantity: 3, year: 2024, color: 'Brilliant Black', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=85' }
];

await connectDatabase();
for (const vehicle of vehicles) {
  await Vehicle.findOneAndUpdate(
    { make: vehicle.make, model: vehicle.model },
    { $set: vehicle },
    { upsert: true, new: true, runValidators: true }
  );
}
console.log(`${vehicles.length} vehicles are ready in the inventory.`);
await mongoose.disconnect();
