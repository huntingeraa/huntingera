import path from 'path'
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const imagePath = req.file.path
    const imageBuffer = await sharp(imagePath)
      .resize({ width: 600, height: 400 })
      .toBuffer()

    // write the modified buffer to disk
    await sharp(imageBuffer).toFile(imagePath)

    res.send(`/${imagePath}`)
  } catch (err) {
    next(err)
  }
})

export default router
