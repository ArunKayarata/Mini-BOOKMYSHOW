const express=require('express');
// const mongoose=require('mongoose');
const app= express();
const cors = require('cors');
require('dotenv').config();
const db=require('./config/dbconfig');
app.use(cors());
app.use(express.json());


const UserRoute=require('./routes/userroutes');
const MovieRouter=require('./routes/moviesroutes');
const TheaterRouter=require('./routes/theaterroutes');
const  BookingRouter=require('./routes/bookingroutes')
app.use('/api/user',UserRoute);
app.use('/api/movies',MovieRouter)
app.use('/api/theaters',TheaterRouter);
app.use('/api/bookings',BookingRouter)






// QwcIOAUpyRJndU5i

app.listen(3001,()=>{console.log('listening on')})