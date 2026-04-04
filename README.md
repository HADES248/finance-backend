# Finance Data Processing & Access Control Backend

## Overview

This project is a backend system for a finance dashboard that manages financial records, user roles, and access control.

It is designed to demonstrate backend engineering principles such as:

* Clean API design
* Role-based access control (RBAC)
* Data validation and error handling
* Aggregation and analytics using MongoDB

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Zod (Validation)

---

## System Architecture

The backend follows a layered architecture:

```
Route → Controller → Service → Model → Database
```

* **Routes** handle API endpoints
* **Controllers** manage request/response
* **Services** contain business logic
* **Models** define database schemas
* **Middlewares** handle auth, validation, and access control

---

## Authentication & Authorization

### Authentication Flow

1. User registers or logs in
2. Server generates a JWT token
3. Token is sent in request headers:

```
Authorization: Bearer <token>
```

4. Middleware verifies token and attaches user to request

---

### Role-Based Access Control (RBAC)

| Role    | Permissions                                               |
| ------- | --------------------------------------------------------- |
| Viewer  | View dashboard data only                                  |
| Analyst | Create, view, and update their own records                |
| Admin   | Full access including managing users and deleting records |

---

---

## API Testing Guide

To quickly test the APIs, use the following steps:

---

### Demo Credentials

#### Admin User

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

#### Analyst User

```json
{
  "email": "analyst@test.com",
  "password": "123456"
}
```

> The viewers are not present, please register a viewers and update roles using the admin APIs.

---

### Step 1: Login

```
POST /api/auth/login
```

Copy the `token` from the response.

---

### Step 2: Add Token in Headers

For all protected routes:

```
Authorization: Bearer <your_token>
```

---

### Tools for Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)
* cURL

---

### Deployed API 

```
https://finance-backend-nu.vercel.app
```

---

### Notes

* Viewer role cannot create/update/delete records
* Analyst can manage their own records
* Admin has full access
* Role changes require re-login to reflect in JWT

---

## User Management APIs

### Get All Users (Admin Only)

```
GET /api/users
```

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:**

```json
[
  {
    "_id": "userId",
    "name": "John",
    "email": "john@test.com",
    "role": "analyst"
  }
]
```

---

### Update User Role (Admin Only)

```
PATCH /api/users/:id/role
```

**Body:**

```json
{
  "role": "analyst"
}
```

---

## Auth APIs

### Register User

```
POST /api/auth/register
```

**Body:**

```json
{
  "name": "Jhon",
  "email": "jhon@test.com",
  "password": "123456"
}
```

---

### Login User

```
POST /api/auth/login
```

**Body:**

```json
{
  "email": "jhon@test.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "user": {...},
  "token": "jwt_token"
}
```

---

## Financial Records APIs

### Create Record (Admin, Analyst)

```
POST /api/records
```

**Body:**

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-01",
  "notes": "monthly salary"
}
```

---

### Get Records (Admin, Analyst)

```
GET /api/records
```

### Query Parameters (Filtering)

| Parameter | Description       |
| --------- | ----------------- |
| type      | income / expense  |
| category  | category name     |
| startDate | filter start date |
| endDate   | filter end date   |

**Example:**

```
GET /api/records?type=expense&category=food&startDate=2026-04-01&endDate=2026-04-30
```

---

### Update Record (Owner or Admin)

```
PATCH /api/records/:id
```

**Body**

```json
{
  "amount": 6000
}
```

---

### Delete Record (Admin Only)

```
DELETE /api/records/:id
```

---

## Dashboard APIs

### Get Summary

```
GET /api/dashboard/summary
```

**Access:** All roles

---

### Response Structure

```json
{
  "totalIncome": 50000,
  "totalExpense": 20000,
  "netBalance": 30000,
  "categoryBreakdown": [
    { "_id": "salary", "total": 50000 }
  ],
  "monthlyTrends": [
    { "_id": 4, "total": 30000 }
  ]
}
```

---

## Validation & Error Handling

* Input validation using **Zod**
* Returns structured error messages
* Uses appropriate HTTP status codes:

  * `400` → Validation error
  * `401` → Unauthorized
  * `403` → Forbidden
  * `404` → Not found
  * `500` → Server error

---

## Access Control Highlights

* Middleware-based RBAC enforcement
* Analysts can only modify their own records
* Admins have full system-level control
* Users cannot assign roles during registration (prevents privilege escalation)

---

## Data Persistence

* MongoDB used as database
* Mongoose for schema modeling and queries

---

## Project Structure

```
src/
├── config/
├── models/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── validations/
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd finance-backend
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run Server

```
npm run dev
```

---

## Design Decisions

* Default role = `viewer` to prevent privilege escalation
* Role updates restricted to admin APIs
* Service layer used to separate business logic
* Aggregation pipelines used for analytics
* Separate validation schemas for create vs update operations

---

## Assumptions

* JWT used for authentication
* Role management handled internally by admin
* Records belong to users unless accessed by admin

---

## Possible Improvements

* Pagination for records
* Swagger API documentation
* Unit & integration testing
* Rate limiting
* Refresh tokens

---

## Conclusion

This project demonstrates a structured backend system with secure access control, scalable API design, and real-world data processing techniques suitable for finance applications.

---

## Author

**Shivansh Singh**
