import path from 'path'
import express from 'express'
import flash from 'connect-flash';
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from './config/db.js'
import cors from 'cors'
import dailyTrend from './api_routes/dailyTrend.js'
import hourTrend from './api_routes/hourTrend.js'
import monthTrend from './api_routes/monthTrend.js'
import yearsTrend from './api_routes/yearsTrend.js'
import regionsTrend from './api_routes/regionsTrend.js';
import relatedTrend from './api_routes/relatedTrend.js';
import competitorsTop from './api_routes/competitorsTop.js';
import userRoutes from './routes/userRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import vendorcreationRoutes from './routes/vendorcreationRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import uploadRoutesM from './routes/uploadRoutesM.js'
import paymentRoutes from './routes/payment.js'
import adminRoutes from './routes/adminRoutes.js'
import overviewRoutes from './routes/overviewRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())


app.use(express.json())
app.use('/api/users/', userRoutes)
app.use('/api/dailyTrend/', dailyTrend)
app.use('/api/hourTrend/', hourTrend)
app.use('/api/monthTrend/', monthTrend)
app.use('/api/yearsTrend/', yearsTrend)
app.use('/api/regionsTrend/', regionsTrend)
app.use('/api/relatedTrend/', relatedTrend)
app.use('/api/competitorsTop', competitorsTop)
app.use('/api/vendors/', vendorRoutes)
app.use('/api/products/', productRoutes)
app.use('/api/orders/', orderRoutes)
app.use('/api/vendorcreations/', vendorcreationRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/uploadm', uploadRoutesM)
app.use('/api/pay/', paymentRoutes)
app.use('/api/admins/', adminRoutes)
app.use('/api/overviews/', overviewRoutes)
app.use('/api/email/', emailRoutes)


app.use(flash());
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))