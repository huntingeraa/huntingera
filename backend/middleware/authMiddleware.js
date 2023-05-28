import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import Vendor from '../models/vendorModel.js'
import Admin from '../models/adminModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const vprotect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.vendor = await Vendor.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const vendor = (req, res, next) => {
  if (req.vendor && req.vendor.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Vendor')
  }
}

const aprotect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Admin')
  }
}

export {protect , vprotect, vendor, aprotect, admin}