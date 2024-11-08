const User = require('../model/user');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({user, token, msg: 'User registered successfully' });
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide both email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new BadRequestError('Invalid password');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token, user });
  };

module.exports = { register, login };