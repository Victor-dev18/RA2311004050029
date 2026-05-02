# Notification System Design

## Overview
A scalable notification system that delivers messages to users efficiently.

## Components

1. API Server
- Handles user requests
- Creates notifications

2. Database
- Stores users and notifications

3. Queue (Kafka / RabbitMQ)
- Handles async processing

4. Worker Service
- Sends notifications

## Flow

User → API → Queue → Worker → Delivery

## Features

- Real-time notifications
- Read/unread status
- Scalable architecture

## Scaling

- Horizontal scaling of API servers
- Message queues for load handling
- Database indexing

## Technologies

- Backend: Node.js
- DB: MongoDB / SQL
- Queue: Kafka / RabbitMQ