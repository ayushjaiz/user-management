# RESTAURANT MENU

## This project focuses on managing the menu of a restaurant. The app uses Nodejs.js fpr server side developemnt written in typescript. This uses uses MongoDB as databse.

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
- **Managing Menu**: User can add category, subcategory and item to their menu. Morever, it also supports edit and delete functionalities.

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
   git clone hhttps://github.com/ayushjaiz/menu-backend
   cd menu-backend
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

This app is deployed on render: https://menu-backend-71n6.onrender.com

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


### What would you have done differently given more time?

- Add pagination and filtering for better performance with large datasets.
- Set up a caching mechanism (Redis) to improve API response times.

## Video explanation

https://www.loom.com/share/852ccb9306934720a24f18bef1e5ad9a?sid=23796a51-4705-4da9-ba51-c86612a9fe52