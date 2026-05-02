# AffordMed Backend Evaluation Submission

This repository contains my submission for the AffordMed Campus Evaluation. It includes implementations of backend services, logging middleware, and system design documentation.

---

## 📁 Project Structure

```
RA2311004050029/
├── logging_middleware/
├── vehicle_maintenance_scheduler/
├── notification_app_be/
├── screenshots/
├── notification_system_design.md
├── README.md
```

---

## 🚀 Services Overview

### 1. Logging Middleware (Port 3000)

* Reusable logging function
* Sends structured logs to external logging API
* Used across backend services

**Endpoints:**

* `GET /` → Test route
* `GET /fail` → Error route

---

### 2. Vehicle Maintenance Scheduler (Port 4000)

* Backend service to process vehicle maintenance tasks
* Integrates with external APIs (depots & vehicles)
* Applies optimization logic to select tasks under constraints

**Endpoint:**

* `GET /schedule`

---

### 3. Notification Service (Port 5000)

* REST API for managing user notifications
* In-memory storage for simplicity

**Endpoints:**

* `POST /users` → Create user
* `POST /notifications` → Create notification
* `GET /users/:id/notifications` → Fetch notifications
* `PUT /notifications/:id/read` → Mark as read

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* REST APIs
* JavaScript

---

## ▶️ How to Run

### 1. Install dependencies

Run inside each service folder:

```
npm install
```

---

### 2. Start services

**Logging Middleware**

```
cd logging_middleware
node index.js
```

**Scheduler Service**

```
cd vehicle_maintenance_scheduler
node index.js
```

**Notification Service**

```
cd notification_app_be
node index.js
```

---

## 📸 API Screenshots

All API outputs and validations are included in the `/screenshots` folder.

---

## 📄 System Design

Detailed system design is available in:

```
notification_system_design.md
```

---

## 🧠 Notes

* The implementation focuses on clean API design, modular structure, and correctness.
* In-memory storage is used for simplicity in the notification service.
* External APIs are used for scheduler data.

---

## 👤 Author

**Victor Devanand Kongala**

* Email: [vk4527@srmist.edu.in](mailto:vk4527@srmist.edu.in)
* Email: [victordevanand02@gmail.com](mailto:victordevanand02@gmail.com)
* GitHub: [https://github.com/Victor-dev18](https://github.com/Victor-dev18)
* LinkedIn: [https://www.linkedin.com/in/victor-devanand-kongala/](https://www.linkedin.com/in/victor-devanand-kongala/)

