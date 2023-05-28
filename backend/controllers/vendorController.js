import asyncHandler from 'express-async-handler';
import Vendor from '../models/vendorModel.js';
import generateToken from '../utils/generateToken.js'

// @desc    Auth vendor and get token
// @route   POST /api/vendors/login
// @access  Public
const authVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const vendor = await Vendor.findOne({ email })

  if (vendor && (await vendor.matchPassword(password))) {
    res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      isAdmin: vendor.isAdmin,
      token: generateToken(vendor._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new vendor
// @route   POST /api/vendors
// @access  Public
const registerVendor = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  const vendorExist = await Vendor.findOne({ email })

  if (vendorExist) {
    res.status(400)
    throw new Error('Vendor already exists')
  }

  const vendor = await Vendor.create({
    name,
    email,
    password,
    isAdmin
  })

  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      isAdmin: vendor.isAdmin,
      token: generateToken(vendor._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid vendor data')
  }
})

// @desc    Get vendor profile
// @route   GET /api/vendors/profile
// @access  Private
const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.vendor._id)

  if (vendor) {
    res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      isAdmin: vendor.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Update vendor profile
// @route   PUT /api/vendors/profile
// @access  Private
const updateVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.vendor._id)

  if (vendor) {
    vendor.name = req.body.name || vendor.name
    vendor.email = req.body.email || vendor.email
    if (req.body.password) {
      vendor.password = req.body.password
    }

    const updatedVendor = await vendor.save()

    res.json({
      _id: updatedVendor._id,
      name: updatedVendor.name,
      email: updatedVendor.email,
      isAdmin: updatedVendor.isAdmin,
      token: generateToken(updatedVendor._id)
    })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})
const updateVendorProfileP = asyncHandler(async (req, res) => {
  const { email } = req.body
  const vendor = await Vendor.findOne({ email: email })

  if (vendor) {
    vendor.email = req.body.email || vendor.email
    if (req.body.password) {
      vendor.password = req.body.password
    }

    const updatedVendor = await vendor.save()

    res.json({
      _id: updatedVendor._id,
      email: updatedVendor.email,
      isVendor: updatedVendor.isVendor,
      token: generateToken(updatedVendor._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private/Vendor
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({})
  res.json(vendors)
})

// @desc    Delete vendor
// @route   DELETE /api/vendors/:id
// @access  Private/Vendor
const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
  const store = await Store.find({ user: vendor._id })
  const len=store.length
  for(var i=0;i<len;i++){
    const stores = await Store.findById(store[i]._id)
    await stores.remove()
  }
  const product = await Product.find({ user: vendor._id })
  const lena=product.length
  for(var i=0;i<lena;i++){
    const products = await Product.findById(product[i]._id)
  await products.remove()
  }
  
  await vendor.remove()

  
    res.json({ message: 'Vendor removed' })
  }
 else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Get vendor by ID
// @route   GET /api/vendors/:id
// @access  Private/Vendor
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).select('-password')

  if (vendor) {
    res.json(vendor)
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Update vendor
// @route   PUT /api/vendors/:id
// @access  Private/Vendor
const updateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    vendor.name = req.body.name || vendor.name
    vendor.email = req.body.email || vendor.email

    const updatedVendor = await vendor.save()

    res.json({
      _id: updatedVendor._id,
      name: updatedVendor.name,
      email: updatedVendor.email,
    })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})


export {
  authVendor,
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  updateVendorProfileP,
  getVendors,
  deleteVendor,
  getVendorById,
  updateVendor,
}