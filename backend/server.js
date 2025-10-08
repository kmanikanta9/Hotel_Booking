import express from 'express'
import 'dotenv/config';
import cors from 'cors'
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { stripeWebhooks } from './controllers/StripeWebhooks.js';

connectDB()
connectCloudinary()

const app = express()
app.use(express.json())
app.use(clerkMiddleware())
app.use(cors())

// Api to listen to Stripe Webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)

// Clerk webhook (must be raw, no json parsing before this)
app.post(
  '/api/clerk',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
)

// JSON parser for other routes


app.get('/', (req, res) => res.send('API is working.'))

app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT))
