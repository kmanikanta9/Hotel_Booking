
// Function to check availability of room

import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Stripe from 'stripe';

const checkAvailability = async({checkInDate,checkOutDate,room})=>{
    try {
        const bookings = await Booking.find({
            room,checkInDate:{$lte:checkOutDate},
            checkOutDate:{$gte:checkInDate}
        })
        const isAvailable = bookings.length === 0;
        return isAvailable

    } catch (error) {
        console.error(error.message)
    }
}

// APi to check availability of room
// Post  /api/bookings/check-availability

export const checkAvailabilityAPI = async(req,res)=>{
    try {
        const {room, checkInDate,checkOutDate}=req.body;
        const isAvailable = await checkAvailability({checkInDate,checkOutDate,room})
        res.json({success:true,isAvailable})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// Api to create a new booking
// post /api/bookings/book

export const createBooking = async(req,res)=>{
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if(!isAvailable){
            return res.json({success:false,message:"Room is not available"});
        }

        const roomData = await Room.findById(room).populate('hotel');
        if(!roomData || !roomData.hotel) 
            return res.json({success:false, message: "Invalid room or hotel"});

        // Calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let totalPrice = roomData.pricePerNight * nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        // Send Mail (non-blocking)
        try {
            await transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: req.user.email,
                subject:'Hotel Booking Details',
                html: `<h2>Your Booking Details</h2>
                <p>Dear ${req.user.username},</p>
                <p>Thank you for your booking! Here are your details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel:</strong> ${roomData.hotel.username}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice}</li>
                </ul>
                <p>We look forward to welcoming you!</p>`
            });
        } catch(err) {
            console.error('Mail failed:', err.message);
        }

        res.json({success:true,message:'Booking created successfully'});

    } catch (error) {
        console.error('Booking Error:', error.message);
        res.json({success:false,message:'Failed to create booking'});
    }
}


// Api to get all bookings for a user
// GET /api/bookings/user

export const getUserBookings = async (req, res) => {
  try {
    console.log("req.user:", req.user);  // <-- check if user exists
    const user = req.user._id;
    const bookings = await Booking.find({ user }).populate('room hotel').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("getUserBookings error:", error);
    res.json({ success: false, message: 'Failed to fetch bookings' });
  }
};



export const getHotelBookings = async(req,res)=>{
    try {
        const hotel = await Hotel.findOne({owner:req.auth.userId});
        if(!hotel){
            return res.json({success:false,message:'No Hotel Found'})
        }
        const bookings = await Booking.find({hotel:hotel._id}).populate('room hotel user').sort({createdAt:-1})
    
        // Total Bookings
    
        const totalBookings = bookings.length;
        // Total revenue;
        const totalRevenue = bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)
        res.json({success:true,dashboardData:{totalBookings,totalRevenue,bookings}})
    } catch (error) {
        res.json({success:false,message:'Failed to fetch bookings'})
    }
}


// controllers/bookingController.js

// controllers/bookingController.js
import stripePackage from "stripe";


export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.json({ success: false, message: "Booking not found" });

    const roomData = await Room.findById(booking.room).populate("hotel");
    const totalPrice = booking.totalPrice;

    const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: roomData.hotel.name },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/my-bookings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/my-bookings`,
      metadata: { bookingId },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    res.json({ success: false, message: "Payment Failed" });
  }
};
