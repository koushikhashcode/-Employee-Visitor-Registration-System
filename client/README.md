# Front Desk - Visitor Registration System (MERN Stack)

A modern, production-grade Visitor Registration and Reception Management System built with the **MERN** stack (MongoDB, Express.js, React, Node.js). Designed to replace physical paper visitor registers at office receptions, campus security gates, and enterprise facilities.

---

## 📁 Project Architecture & Folder Structure

```
.
├── client/                     # Standalone React Frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── types/visitor.ts
│       ├── services/api.ts
│       ├── context/VisitorContext.tsx
│       ├── hooks/useDebounce.ts
│       ├── components/
│       │   ├── common/        # StatCard, Toast, ConfirmDialog, EmptyState, Skeleton
│       │   ├── layout/        # Sidebar, TopBar, MobileNav
│       │   └── visitors/      # VisitorTable, VisitorCard, VisitorForm, VisitorModal
│       ├── pages/             # DashboardPage, VisitorsPage
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
│
├── server/                     # Standalone Express API Backend
│   ├── package.json
│   ├── server.ts              # Standalone Express startup (port 5000)
│   ├── app.ts                 # Express application factory & middleware setup
│   ├── config/
│   │   └── db.ts              # MongoDB Mongoose connection + In-Memory fallback manager
│   ├── models/
│   │   └── Visitor.ts         # Mongoose schema with 10-digit mobile & purpose validations
│   ├── controllers/
│   │   └── visitorController.ts # Full CRUD, search, today stats & CSV export
│   ├── routes/
│   │   └── visitorRoutes.ts   # /api/visitors router
│   └── middleware/
│       ├── validator.ts       # Strict payload validation middleware
│       └── errorHandler.ts    # Centralized error handler
│
├── src/                        # Live Vite preview client
├── server.ts                   # Unified dev entry point (Express API + Vite middlewares)
├── .env.example                # Sample environment configuration
├── package.json                # Root package configuration
└── tsconfig.json
```

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI (optional, in-memory store activates if offline).

### 1. Unified Run (Recommended for preview & full-stack development)
Run both backend API and frontend with Vite middleware on port 3000:
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and paste your MONGO_URI (e.g., mongodb://localhost:27017/frontdesk)

# 3. Start development server
npm run dev
# App will run at http://localhost:3000 with API at http://localhost:3000/api
```

---

### 2. Standalone Mode (Independent Client & Server)

#### Run Backend Server:
```bash
cd server
npm install
npm run dev
# Express API starts at http://localhost:5000
```

#### Run Frontend Client:
```bash
cd client
npm install
npm run dev
# Vite client starts at http://localhost:5173 (proxies /api to http://localhost:5000)
```

---

## 🔌 Live MongoDB vs. Fallback Store

The system is engineered with an **automated resilience layer**:
1. When `MONGO_URI` is supplied in `.env` and accessible, the application executes queries through **Mongoose** against your live database collections.
2. If `MONGO_URI` is omitted or MongoDB is unreachable, the system activates an **in-memory data store** with realistic seed records.
3. If the server is offline, the client seamlessly maintains a **browser local storage cache** so receptionists never lose visitor check-in functionality.

To switch to a live MongoDB Atlas cluster, simply set `MONGO_URI` in `.env`:
```env
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/frontdesk?retryWrites=true&w=majority"
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/visitors` | Check in a new visitor (validates 10-digit mobile & purpose) |
| `GET` | `/api/visitors?search=` | Retrieve all visitors sorted newest first; supports search query |
| `GET` | `/api/visitors/:id` | Retrieve single visitor details |
| `PUT` | `/api/visitors/:id` | Update visitor information with validation |
| `DELETE` | `/api/visitors/:id` | Remove visitor entry from the register |
| `GET` | `/api/visitors/stats/today` | Metrics: Today's arrivals count, all-time count, and latest visitor |
| `GET` | `/api/visitors/export/csv` | Download complete or filtered visitor ledger in RFC-4180 CSV format |
| `GET` | `/api/health` | Service health check and database provider status |
