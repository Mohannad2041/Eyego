require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');

const errorHandlerMiddleware = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.js'); 
const taskRoutes = require('./routes/task.js'); 
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/tasks', taskRoutes); 


app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
