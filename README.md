# Velocity Motors — Dealership Inventory System

A polished MERN single-page application for browsing, managing, and purchasing dealership inventory. It provides role-aware inventory management, secure token authentication, responsive filtering, and an elegant, editorial-style experience.

## Stack

- React, Vite, Tailwind CSS
- Node.js, Express, JWT and Mongoose
- MongoDB (a persistent local instance or MongoDB Atlas)
- Vitest, Supertest, and MongoDB Memory Server for API tests

## Run locally

1. Install dependencies: `npm.cmd install`
2. Copy `.env.example` to `server/.env` and set a strong `JWT_SECRET`. For Atlas, replace `MONGODB_URI` with your Atlas connection string.
3. Start MongoDB. The quickest local option is `docker compose up -d mongodb`; alternatively use a locally installed MongoDB service.
4. Run `npm.cmd run dev` and open `http://localhost:5173`.

The browser app proxies `/api` requests to `http://localhost:5000`. The backend verifies `MONGODB_URI` at startup and uses Mongoose for persistent collections.

## Authentication and roles

Register through the UI, then use the account normally to purchase vehicles. Every new account has the `user` role. To make an account an administrator after registering:

`npm.cmd run make-admin --workspace server -- email@example.com`

Admins can add, update, delete and restock inventory through protected API routes. The REST API supports:

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET/POST /api/vehicles`, `GET /api/vehicles/search`
- `PUT/DELETE /api/vehicles/:id`
- `POST /api/vehicles/:id/purchase`, `POST /api/vehicles/:id/restock`

## Tests

Run `npm.cmd test`. The suite covers authentication, protected endpoints, admin authorization, search, and the atomic purchase inventory decrement. It uses an isolated temporary MongoDB database for tests; the running application always uses the persistent URI in `server/.env`.

## Screenshots

After starting the app, capture the responsive inventory dashboard at `http://localhost:5173` and add the image(s) to this section before publishing the repository.

## My AI Usage

I used OpenAI Codex as a development partner to scaffold the application structure, draft the Express controllers and test cases, and refine the React/Tailwind visual system. I reviewed and adapted the generated work, including role boundaries, validation, MongoDB configuration, and the user flow. It sped up repetitive setup and gave me more time to focus on integration and presentation, while I remained responsible for testing and understanding the final implementation.

The raw AI conversation log is retained in [PROMPTS.md](PROMPTS.md), as required by the kata.
