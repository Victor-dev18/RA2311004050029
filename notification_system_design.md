# Notification System Design

## Overview
A simple backend notification system designed to manage user notifications using REST APIs. The system supports creating users, sending notifications, retrieving notifications, and marking them as read.

This implementation focuses on clarity, correctness, and API design rather than distributed infrastructure.

---

## Architecture

The system follows a modular backend structure:

- API Layer → Handles HTTP requests
- Service Logic → Processes data and business logic
- In-Memory Storage → Stores users and notifications during runtime

---

## Components

### 1. API Server (Node.js + Express)
- Handles all incoming HTTP requests
- Provides REST endpoints for users and notifications
- Validates inputs and returns structured responses

### 2. In-Memory Data Storage
- Stores users and notifications in arrays
- Used for simplicity and fast access during runtime
- No external database used in this implementation

---

## API Endpoints

### User Management
- `POST /users` → Create a new user

### Notification Management
- `POST /notifications` → Create a notification
- `GET /users/:id/notifications` → Get notifications for a user
- `PUT /notifications/:id/read` → Mark notification as read

---

## Data Flow

1. User is created via API  
2. Notification is generated for a user  
3. Notifications are stored in memory  
4. User fetches notifications  
5. Notifications can be marked as read  

---

## Features

- RESTful API design
- Read / unread notification tracking
- Simple and clear architecture
- Easy to extend to database-backed system

---

## Limitations

- Data is stored in memory (not persistent)
- No message queue or async processing
- Not designed for distributed scaling

---

## Possible Improvements

- Add database (MongoDB / PostgreSQL) for persistence
- Introduce message queues (Kafka / RabbitMQ) for async delivery
- Implement real-time updates using WebSockets
- Add authentication and user sessions
- Improve scalability with microservices

---

## Technologies Used

- Backend: Node.js, Express.js
- API Testing: Postman
