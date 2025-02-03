# USER MANAGEMENT

#### This project focuses on comprehensive User Management System coupled with an Admin Panel that provides core functionalities for user registration, profile management, and communication via notifications.

## Table of Contents

- [Project Features](#project-features)
- [Tech Stack](#tech-stack)
- [Libraries Used](#libraries-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints and Sample Requests](#api-endpoints-and-sample-requests)
- [Development Choices](#development-choices)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)
- [Answers for the Assignment](#answers-for-the-assignment)

---

## Project Features

- **Authentication**: Implement secure user authentication using JWT
- **Send Notification**: Send the notification to multiple users as per their availability
- **Email-queuing**: Queue the email and sends it when the user is avaliable

---

## Tech Stack

- **Backend**: NodeJs, Express, Typescript
- **Database**: MongDB, Redis

---

## Libraries Used

- **dotenv**: Loads environment variables from `.env` file.
- **express**: Fast, minimal web server framework.
- **nodemon**: Automatically restarts server on file changes..
- **typescript**: Used to write TypeScript code.
- **ts-node**: Execute typescript code.
- **jsonwebtoken**: Implement authentication and role based access control
- **nodemailer**: Sending Email via Gmail SMTP
- **bullmq**: Queue the email jobs

---

## Setup and Installation

### Prerequisites

- NodeJS
- MongoDB
- Redis

### Environment Variables

- Create a `.env` file in the backend directory and copy the content from `.env.example` into it.
- Get MongoDb url

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayushjaiz/user-management
   cd user-management
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the Backend Application:**
   ```bash
   npm run build
   npm run start
   ```

---

## Routes

### Public Routes

| Route          | Method | Description                               |
| -------------- | ------ | ----------------------------------------- |
| /auth/login    | POST   | Authenticates user and returns JWT token. |
| /auth/register | POST   | Registers a new user.                     |
| /auth/logout   | POST   | Logs out the current user.                |

### Protected Routes

- Admin Routes

| Route                      | Method | Description                                 |
| -------------------------- | ------ | ------------------------------------------- |
| /admin/users/:user-id/role | PATCH  | Update user role                            |
| /admin/notifications/send  | POST   | Send notification (criticical/non-critical) |

- User Routes

| Route                     | Method | Description         |
| ------------------------- | ------ | ------------------- |
| /users/:id                | PUT    | Update user profile |
| /users/notifications/send | POST   | Send notification   |

## Development Choices

### Why Node.js?

- Excellent package ecosystem
- Strong async/await support
- Easy deployment options

### Why Typescript?

- Prevent from errors during development phase
- Type security
- Faster code development

### Why MongoDB?

- Flexibility to accomodate changes in schema
- Easy documentation

### Why Redis?

- BullMq uses Redis for creating job queue

---

## Deployment

This project is deployed on render : https://user-management-slqy.onrender.com

First response can take upto a minute

---

## Acknowledgements

This project was completed with the assistance of various online resources. I utilized the following tools and sources to support the development of this application:

- Google + Stack Overflow - for bugs and documentation of libraries
- MongoDb docs

## Answers for the Assignment

### Which database have you chosen and why?

I have chosen MongoDB because:

- It provides a flexible schema, which can accomodate changes according to later requirements.
- It offers high scalability and fast read/write operations, which are useful for menu-based applications.

### Three things that I learned from this assignment

- Implementing CRUD operations with proper API design.
- Schema designing which can scale.
- Code modularity. This repo features code division into routes, controllers and database layer.

### What was the most difficult part of the assignment?

- Designing the good schema and validations
