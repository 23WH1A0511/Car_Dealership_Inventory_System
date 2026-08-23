# Velocity Motors - Dealership Inventory System

Velocity Motors is a full-stack car dealership inventory application. Users can browse and search available vehicles, create an account, purchase vehicles, and track their orders. Administrators have a protected inventory workspace for adding, editing, deleting, restocking, and managing the status of customer orders.

## Features

- Responsive vehicle inventory with search and category filtering
- User registration and login with JWT authentication
- Vehicle purchasing with stock validation and inventory decrementing
- User order history and order status tracking
- Admin-only inventory and order management
- MongoDB persistence through Mongoose
- Automated API tests for authentication, authorization, search, and purchasing

## Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, JWT, bcryptjs, Mongoose
- **Database:** MongoDB 7, locally or through MongoDB Atlas
- **Testing:** Vitest, Supertest, MongoDB Memory Server

## Project Structure

```text
client/                 React and Vite frontend
  src/                  Components and styles
server/                 Express backend
  src/controllers/      Request handlers
  src/models/           Mongoose models
  src/routes/           API route definitions
  src/scripts/          Admin and vehicle seed scripts
  tests/                API test suite
docker-compose.yml      Local MongoDB service
PROMPTS.md              Raw AI conversation log
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB 7 or later, or Docker Desktop
- Git

## Installation

From the project root, install all workspace dependencies:

```bash
npm install
```

The root package uses npm workspaces, so this installs dependencies for both `client` and `server`.

## Environment Configuration

Create `server/.env` with the following values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/velocity_motors
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

For MongoDB Atlas, replace `MONGODB_URI` with the Atlas connection string. Never commit `server/.env` or any other file containing credentials.

## Start MongoDB

To run MongoDB with Docker:

```bash
docker compose up -d mongodb
```

Alternatively, start a local MongoDB service and ensure it is listening on port `27017`.

## Run the Backend

In a terminal from the project root:

```bash
npm run dev --workspace server
```

The API runs at `http://localhost:5000`.

For a production-style Node server, use:

```bash
npm run start --workspace server
```

## Run the Frontend

In a second terminal from the project root:

```bash
npm run dev --workspace client
```

Open `http://localhost:5173` in a browser. Vite proxies frontend `/api` requests to the backend at `http://localhost:5000`.

The frontend and backend can also be started together with:

```bash
npm run dev
```

## Seed Data and Administrator Access

After MongoDB and the backend are running, insert sample vehicles with:

```bash
npm run seed-vehicles --workspace server
```

Register a normal account through the application. To grant that account administrator access, run:

```bash
npm run make-admin --workspace server -- email@example.com
```

An administrator can then sign in and manage inventory and customer orders from the admin dashboard.

## API Overview

- `POST /api/auth/register` - Create a user account
- `POST /api/auth/login` - Authenticate a user
- `GET /api/vehicles` - List inventory
- `GET /api/vehicles/search` - Search inventory
- `POST /api/vehicles` - Add a vehicle as an administrator
- `PUT /api/vehicles/:id` - Update a vehicle as an administrator
- `DELETE /api/vehicles/:id` - Delete a vehicle as an administrator
- `POST /api/vehicles/:id/purchase` - Purchase an available vehicle
- `POST /api/vehicles/:id/restock` - Restock a vehicle as an administrator
- `GET /api/orders` - List orders available to the authenticated user
- `PATCH /api/orders/:id/status` - Update an order status as an administrator

## Tests

Run the backend test suite from the project root:

```bash
npm test
```

The tests use MongoDB Memory Server and cover authentication, protected routes, admin authorization, vehicle search, and atomic stock decrementing during purchase.

To build the frontend for production:

```bash
npm run build
```

## Screenshots

These Markdown image links are ready for final application images. Add the corresponding image files under `docs/screenshots/` when screenshots are available.

![CoverPage](/Screenshots/Cover Page.png)

![Admin dashboard with inventory management](docs/screenshots/admin-dashboard.png)

![Vehicle inventory and search view](docs/screenshots/inventory-search.png)

## My AI Usage

I used OpenAI Codex as a development partner to scaffold the application structure, draft the Express controllers and test cases, and refine the React/Tailwind visual system. I reviewed and adapted the generated work, including role boundaries, validation, MongoDB configuration, and the user flow. It sped up repetitive setup and gave me more time to focus on integration and presentation, while I remained responsible for testing and understanding the final implementation.

The raw AI conversation log is retained in [PROMPTS.md](PROMPTS.md), as required by the kata.
