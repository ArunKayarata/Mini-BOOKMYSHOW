 const stripe=require('stripe')(process.env.stripe_key);
const authMiddleware = require("../Middlewares/authMiddleware");
 const router=require('express').Router();
 const Bookings=require('../Models/bookingmodel');
 const Shows=require('../Models/showmodel');
 router.post("/make-payment", authMiddleware, async (req, res) => {
    try {
        // console.log("hi there")
        const { token, amount } = req.body;
    
        // const customer = await stripe.customers.create({
        //   email: token.email,
        //   source: token.id,
        // });
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "INR",
        });
    
  
      const transactionId = paymentIntent.client_secret;
    //   console.log(transactionId);
     return  res.send({
        success: true,
        message: "Payment successful",
        data: transactionId,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
  
  router.post("/book-show", authMiddleware, async (req, res) => {
    try {
      // save booking
      const newBooking = new Bookings(req.body);
      await newBooking.save();
    //   console.log("booked tickets")
  
      const show = await Shows.findById(req.body.show);
      // update seats
      await Shows.findByIdAndUpdate(req.body.show, {
        bookedSeats: [...show.bookedSeats, ...req.body.seats],
      });
  
      res.send({
        success: true,
        message: "Show booked successfully",
        data: newBooking,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
  router.get("/get-bookings/", authMiddleware, async (req, res) => {
    try {
        console.log("I ma here")
      const bookings = await Bookings.find({ user: req.body.userId })
        .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "Movies",
          },
        })
        .populate("user")
        .populate({
          path: "show",
          populate: {
            path: "theaterId",
            model: "Theaters",
          },
        });
//   console.log("=====>",bookings)
      res.send({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

  module.exports =router;