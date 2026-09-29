# Front Desk — Visitor Registration System 🏢

A modern, production-grade **MERN** (MongoDB, Express.js, React, Node.js) Visitor Registration and Front Desk Management Application. Engineered to replace paper visitor logbooks with a fast, responsive digital register featuring offline resilience, real-time search, metrics dashboards, and CSV report exports.

---

## ✨ Features

- **⚡ Fast Visitor Check-In**: Register visitors with validated fields (Full Name, 10-digit Mobile Number, Organization, Host/Person to Meet, and Visit Purpose).
- **📊 Real-time Dashboard**: Overview cards displaying today's total check-ins, all-time records, and latest check-in details.
- **🔍 Instant Live Search**: Debounced multi-field search across visitor name, phone number, organization, and host person.
- **✏️ Record Management**: Full CRUD capabilities to view, edit, and delete visitor records with safety confirmation modals.
- **📥 CSV Ledger Export**: Export filtered or all-time visitor registration records directly into standard RFC-4180 CSV format.
- **🛡️ Multi-Tier Resilience**:
  - **Live MongoDB**: Seamless connection to local MongoDB or MongoDB Atlas.
  - **In-Memory Server Fallback**: Auto-activates if MongoDB is unavailable, with zero configuration needed.
  - **Browser Local Cache**: Retains visitor entries locally in case of network interruptions.
- **🎨 Neo-Brutalist Design**: High-contrast, clean visual design with responsive layouts across mobile, tablet, and desktop viewports.

---

## 🏗️ Architecture & Project Structure

```
front-desk---visitor-registration-system/
├── client/                           # React Frontend (Vite + Vanilla CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # StatCard, Toast, ConfirmDialog, EmptyState, Skeleton
│   │   │   ├── layout/              # Sidebar, TopBar, MobileNav
│   │   │   └── visitors/            # VisitorTable, VisitorCard, VisitorForm, VisitorModal
│   │   ├── context/
│   │   │   └── VisitorContext.jsx   # Global state management & caching layer
│   │   ├── hooks/
│   │   │   └── useDebounce.js       # Search debounce hook
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx    # Analytics and metric overview page
│   │   │   └── VisitorsPage.jsx     # Visitor list table & management page
│   │   ├── services/
│   │   │   └── api.js               # Axios HTTP client with offline fallback
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Neo-brutalist custom styling
│   ├── package.json
│   └── vite.config.js
│
├── server/                           # Express REST API (Node.js ES Modules)
│   ├── config/
│   │   └── db.js                    # MongoDB connector with in-memory fallback
│   ├── controllers/
│   │   └── visitorController.js     # CRUD, stats calculation & CSV generator
│   ├── middleware/
│   │   ├── errorHandler.js          # Centralized error & 404 handler
│   │   └── validator.js             # Request body validation middleware
│   ├── models/
│   │   └── Visitor.js               # Mongoose schema definition
│   ├── routes/
│   │   └── visitorRoutes.js         # REST route definitions
│   ├── app.js                       # Express app configuration & middleware
│   ├── server.js                    # Server entrypoint
│   ├── package.json
│   └── .env
│
├── .env.example                      # Sample environment variables
└── README.md                         # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB** *(Optional)*: Local MongoDB instance (`mongodb://localhost:27017`) or [MongoDB Atlas](https://www.mongodb.com/atlas) URI.

---

### 1. Backend Setup

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# (Optional) Setup environment variables
cp .env.example .env

# Start the Express API server (runs with watch mode on port 5000)
npm run dev
```

> **Note**: If `MONGO_URI` is not specified or MongoDB is not running locally, the server automatically starts in **In-Memory mode** with initial sample visitor data.

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the client folder
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The Vite dev server is configured to proxy all `/api` calls to `http://localhost:5000`.

---

## ⚙️ Environment Variables

### Server (`server/.env` or root `.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port for the Express backend server |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |
| `MONGO_URI` | *None* | MongoDB connection URI (e.g. `mongodb://localhost:27017/visitor_db` or Atlas URI) |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin for the frontend client |

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/visitors` | Check in a new visitor (validates 10-digit mobile, name, host, purpose) |
| `GET` | `/api/visitors?search=` | Retrieve all visitors (sorted newest first; optional `search` query parameter) |
| `GET` | `/api/visitors/:id` | Retrieve single visitor details by ID |
| `PUT` | `/api/visitors/:id` | Update an existing visitor record |
| `DELETE` | `/api/visitors/:id` | Remove a visitor record from the register |
| `GET` | `/api/visitors/stats/today` | Metrics: Today's visitor count, total all-time count, latest check-in |
| `GET` | `/api/visitors/export/csv` | Download complete or search-filtered visitor records as a CSV file |
| `GET` | `/api/health` | Service health status and active database provider |

---

## 🧪 Build & Production Deployment

### Build the Frontend:
```bash
cd client
npm run build
```
This produces an optimized production bundle in `client/dist`.

### Run Production Server:
```bash
cd server
NODE_ENV=production PORT=5000 node server.js
```
The server will automatically serve the static React frontend from `../client/dist` and handle client-side routing fallbacks.

---

## 📄 License

This project is licensed under the MIT License.
