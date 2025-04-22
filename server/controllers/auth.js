import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

export const register = async (req, res) => {
  // console.log(req.body)
  // res.status(StatusCodes.CREATED).json({ user: req.body})

  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name , id: user.id, role: user.role?user.role:'user'}, token })
// const user = await User.find();
  // res.status(StatusCodes.CREATED).json({ user })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name , id: user.id, role: user.role?user.role:'user' }, token })
}

// module.exports = {
//   register,
//   login,
// }
