import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoute.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { stripeWebhooks } from './controllers/StripeWebhooks.js';

connectDB();
connectCloudinary();

const app = express();

// Enable CORS
app.use(cors());

// Stripe Webhook (must be raw)
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Clerk webhook (must be raw)
app.post(
  '/api/clerk',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

// JSON parser for all other routes
app.use(express.json());

// Clerk middleware must be AFTER express.json() for parsing normal requests
app.use(clerkMiddleware());

// Test endpoint
app.get('/', (req, res) => res.send('API is working.'));

// Routes
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
