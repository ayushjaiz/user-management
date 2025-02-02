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

---

## Tech Stack

- **Backend**: NodeJs, Express, Typescript
- **Database**: MongDB

---

## Libraries Used

- **dotenv**: Loads environment variables from `.env` file.
- **express**: Fast, minimal web server framework.
- **nodemon**: Automatically restarts server on file changes..
- **typescript**: Used to write TypeScript code.
- **ts-node**: Execute typescript code.
- **jsonwebtoken**: Implement authentication and role based access control

---

## Setup and Installation

### Prerequisites

- NodeJS
- MongoDB

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

---

## Deployment


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

