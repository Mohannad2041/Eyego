const Task = require('../model/task');
const User = require('../model/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    await User.findByIdAndUpdate(
        req.user.userId,
        { $push: { tasks: task._id } },
        { new: true, runValidators: true }
      );
    res.status(StatusCodes.CREATED).json({ task })
};
  
const getAllTasks = async (req, res) => {   
        const user = await User.findById(req.user.userId).populate('tasks');
        res.status(StatusCodes.OK).json({ tasks: user.tasks });
};

const getTaskById = async (req, res) => {
    const userId = req.user.userId; 
    const taskId = req.params.id;

    const user = await User.findById(userId).populate('tasks');

    const task = user.tasks.find(task => task._id.toString() === taskId);
    if (!task) {
        throw new NotFoundError('Task not found');
    }
    res.status(StatusCodes.OK).json(task);
};

const updateTask = async (req, res) => {
    const { id } = req.params; 
    const { taskName, description, isComplete } = req.body; 

    try {
        const user = await User.findOne({ _id: req.user.userId }).populate('tasks');
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === id);

        if (taskIndex === -1) {
            throw new NotFoundError('Task not found for this user');
        }

        const task = user.tasks[taskIndex];

        if (taskName) task.taskName = taskName;
        if (description) task.description = description;
        if (isComplete !== undefined) task.isComplete = isComplete;

        await task.save();

        res.status(StatusCodes.OK).json(task);
    } catch (error) {
        console.error(error);
        throw new BadRequestError(error.message);
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params; 

    try {
        const user = await User.findOne({ _id: req.user.userId });
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === id);

        if (taskIndex === -1) {
            throw new NotFoundError('Task not found for this user');
        }
        const task = await Task.findByIdAndDelete(id);

        user.tasks.splice(taskIndex, 1);
        await user.save();

        res.status(StatusCodes.OK).json({ msg: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        throw new BadRequestError(error.message);
    }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };