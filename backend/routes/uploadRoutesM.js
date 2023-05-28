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

  if (extname && mimetype ) {
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

router.post('/', upload.array('image', 4), async (req, res, next) => {
  try {
    const imagePaths = []
    for (const file of req.files) {
      const imagePath = file.path
      const imageBuffer = await sharp(imagePath)
        .resize({ width: 600, height: 400 })
        .toBuffer()

      // write the modified buffer to disk
      await sharp(imageBuffer).toFile(imagePath)
      imagePaths.push(`/${imagePath}`)
    }

    res.json({ paths: imagePaths })
  } catch (err) {
    next(err)
  }
})

export default router
