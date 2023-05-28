import asyncHandler from 'express-async-handler';
import Vendorcreation from '../models/vendorcreationModel.js';
import Product from '../models/productModel.js'


// @desc    Fetch all vendorcreations
// @route   GET /api/vendorcreations
// @access  Public
const getVendorcreations = asyncHandler(async (req, res) => {
  const pageSize = 1000
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Vendorcreation.countDocuments({ ...keyword })
  const vendorcreations = await Vendorcreation.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ vendorcreations, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single vendorcreations
// @route   GET /api/vendorcreations/:id
// @access  Public
const getVendorcreationById = asyncHandler(async (req, res) => {
  const vendorcreation = await Vendorcreation.findById(req.params.id);

  if (vendorcreation) {
    res.json(vendorcreation);
  } else {
    res.status(404);
    throw new Error('Vendorcreation not found');
  }
})

// @desc    Delete a vendorcreations
// @route   DELETE /api/vendorcreations/:id
// @access  Private/Admin
const deleteVendorcreation = asyncHandler(async (req, res) => {
  const vendorcreation = await Vendorcreation.findById(req.params.id)

  if (vendorcreation) {
  const product = await Product.find({ user: vendorcreation.user })
  const len=product.length
  for(var i=0;i<len;i++){
    const products = await Product.findById(product[i]._id)
  await products.remove()
  }
    await vendorcreation.remove()
    res.json({ message: 'Vendorcreation removed' })
  } else {
    res.status(404)
    throw new Error('Vendorcreation not found')
  }
})

// @desc    Create a vendorcreations
// @route   POST /api/vendorcreations
// @access  Private/Admin
const createVendorcreation = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    cnt,
    email,
    location,
  } = req.body
  const vendorcreation = new Vendorcreation({
    name: name,
    image: image,
    user: req.vendor._id,
    description: description,
    category: category,
    cnt: cnt,
    email: email,
    location: location,
    
  })

  const vendorcreations = await Vendorcreation.find({ user: req.vendor._id })
  if (vendorcreations.length===0) {
    const createdVendorcreation1 = await vendorcreation.save()
    res.status(201).json(createdVendorcreation1)

  } else {
    res.status(404);
    throw new Error('Sorry, You can have only One Vendor Profile At a Time');
  }
})

// @desc    Update a vendorcreations
// @route   PUT /api/vendorcreations/:id
// @access  Private/Admin
const updateVendorcreation = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    cnt,
    email,
    location,
  } = req.body

  const vendorcreation = await Vendorcreation.findById(req.params.id)

  if (vendorcreation) {
    vendorcreation.name = name
    vendorcreation.image = image
    vendorcreation.description = description
    vendorcreation.category = category
    vendorcreation.location = location
    vendorcreation.cnt=cnt
    vendorcreation.email=email

    const updatedVendorcreation = await vendorcreation.save()
    res.json(updatedVendorcreation)
  } else {
    res.status(404)
    throw new Error('Vendorcreation not found')
  }
})

// @desc    Create new review
// @route   POST /api/vendorcreations/:id/reviews
// @access  Private
const createVendorcreationReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const vendorcreation = await Vendorcreation.findById(req.params.id)

  if (vendorcreation) {
    const alreadyReviewed = vendorcreation.reviews.find(
      (r) => r.admin.toString() === req.admin._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Vendorcreation already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    vendorcreation.reviews.push(review)

    vendorcreation.numReviews = vendorcreation.reviews.length

    vendorcreation.rating =
      vendorcreation.reviews.reduce((acc, item) => item.rating + acc, 0) /
      vendorcreation.reviews.length

    await vendorcreation.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Vendorcreation not found')
  }
})

// @desc    Get top rated vendorcreations
// @route   GET /api/vendorcreations/top
// @access  Public
const getTopVendorcreations = asyncHandler(async (req, res) => {
  const limit = 3
  const vendorcreations = await Vendorcreation.find({}).sort({ rating: -1 }).limit(limit)

  res.json(vendorcreations)
})

const getMyVendorcreations = asyncHandler(async (req, res) => {
  const vendorcreations = await Vendorcreation.find({ user: req.vendor._id })
  res.json(vendorcreations)
})

export {
  getVendorcreations,
  getVendorcreationById,
  deleteVendorcreation,
  createVendorcreation,
  updateVendorcreation,
  createVendorcreationReview,
  getTopVendorcreations, 
  getMyVendorcreations
}