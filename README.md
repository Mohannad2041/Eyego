**Read me File**
### Project Name: Task Manager API

## Setup Instructions

# Tech Stack
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Libraries/Packages: 
  - express
  - mongoose
  - jsonwebtaoken
  - bcryptjs
  - express-async-errors
  - http-status-codes

  - Install dependencies: 'npm install'
  - Run API: 'npm start'


---
# Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Postman (or any API testing tool)

---


Clone the Repository
Repo url: https://github.com/Mohannad2041/Eyego.git

#Approach to the project


1. Initial Planning
The first step was defining the features required for the API, such as:

-User authentication using JWT tokens.
-CRUD operations for tasks, with each task being associated with a specific user.
-Handling errors gracefully, including custom error classes for various HTTP status codes.
-Bcrypt library for password hashing.

Luckily I already had experience with the mentioned features and had a good understanding of how to implement them.

2. Database Design
Designing the database models was the next thing to get an idea of what objects I'm dealing with so that was the very next step and the first file I built. I created a Task model with fields for task name, description, completion status, and the user who created the task and a user model that also included a tasks array.

3. CRUD Operations
My next task was building the logic and I made sure to keep the operations straightforward, with appropriate error handling to provide clear messages for cases such as missing data or unauthorized actions.

4. Error Handling and Validation and Testing
To manage errors efficiently, I implemented custom error classes, such as BadRequestError, NotFoundError, and UnauthenticatedError. These custom errors allow for more precise control over the response status codes and the error messages sent to the client. For instance, if a user tries to update a task that doesn’t exist, a NotFoundError is thrown.
I also ensured that my API gracefully handles server errors with a global error handler, which catches unexpected issues and returns a 500 Internal Server Error response.
Before implementing the core features, I planned for input validation and error handling to ensure that only valid data is accepted by the API. 
For testing the endpoints, I used Postman to manually test API requests and responses, ensuring the behavior is as expected. The API was tested for edge cases like missing fields and invalid data to make sure the application could handle them gracefully.

5. Clean Code and Modularization
I focused on writing clean, maintainable code by modularizing functionality into separate files:

Routes and controllers for task management.
Middleware for authentication and error handling.
Custom error classes to handle different HTTP errors.
This modular approach makes it easier to scale and maintain.

Thank you!

