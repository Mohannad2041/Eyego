const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const{
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}  =  require('../controller/task');

router.get('/getAllTasks',authenticateUser, getAllTasks);
router.get('/getTaskById/:id',authenticateUser, getTaskById);
router.post('/createTask',authenticateUser, createTask);
router.patch('/updateTask/:id',authenticateUser, updateTask);
router.delete('/deleteTask/:id',authenticateUser, deleteTask);

module.exports = router;