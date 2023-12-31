const router = require("express").Router();
const Theaters = require("../Models/theatersmodel");
const authMiddleware = require("../Middlewares/authMiddleware");
const Shows =require("../Models/showmodel")



router.post('/add-theater',authMiddleware,async(req,res)=>{
    try{
      
        const theater= new Theaters(req.body);
        await theater.save();
       return  res.status(200).send({
            success: true,
            message: "Theater added successfully"
          });

    }catch(err){
        return res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})

// get all theaters by owner
router.get('/get-all-theaters-by-owner',authMiddleware,async(req,res)=>{
    try{
        // console.log(req.query.ownerId);
        const theaters= await Theaters.find(req.query.ownerId);
        return res.status(200).send({
            success: true,
            message:"Theaters fetched successfully",
            data:theaters
          });

    }catch(err){
        return res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})
router.put('/update-theater',authMiddleware,async(req,res)=>{
    try{
     
      await Theaters.findByIdAndUpdate(req.body.theatreId,req.body)
     
        res.status(200).send({
            success: true,
            message: "Theater updated successfully"
            
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})

router.delete('/delete-theater',authMiddleware,async(req,res)=>{
    try{
     
      await Theaters.findByIdAndDelete(req.query.theaterId);
       
        res.status(200).send({
            success: true,
            message: "Theater deleted successfully"    
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})
router.get("/get-all-theaters", authMiddleware, async (_, response) => {
    try {
      const theatres = await Theaters.find().populate("owner");
      response.send({
        success: true,
        message: "Theatres fetched successfully",
        data: theatres
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });



  router.post("/add-show", authMiddleware, async (req, res) => {
    try {
      // console.log(req.body)
      const newShow = new Shows(req.body);
      await newShow.save();
      return res.status(200).send({
        success: true,
        message: "Show added successfully"
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message
      });
    }
  });
  
  router.post("/get-all-shows-by-theatre", authMiddleware, async (request, response) => {
    try {
      const shows = await Shows.find({ theaterId: request.body.theatreId }).populate("movie");
      response.send({
        success: true,
        message: "Shows fetched successfully",
        data: shows
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });
  
  router.delete("/delete-show", authMiddleware, async (request, response) => {
    try {
      await Shows.findByIdAndDelete(request.query.showId);
      response.send({
        success: true,
        message: "Show Deleted Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });
  router.post(
    "/get-all-theaters-by-movie",
    authMiddleware,
    async (request, response) => {
      try {
       
        const { movieId, date } = request.body;
    
  
        // get all shows
        const shows = await Shows.find({ movie: movieId, date })
          .populate("theaterId")
          .sort({ createdAt: -1 });
       
        // get all unique theatres from those shows
        let uniqueTheatres = [];
        shows.forEach((show) => {
          const theatre = uniqueTheatres.find(
            (theaterId) => theaterId._id == show.theaterId._id
          );
  
          if (!theatre) {
            const showsForThisTheatre = shows.filter(
              (showObj) => showObj.theaterId._id == show.theaterId._id
            );
            uniqueTheatres.push({
              ...show.theaterId._doc,
              shows: showsForThisTheatre,
            });
          }
        });
  
        response.send({
          success: true,
          message: "Shows fetched successfully",
          data: uniqueTheatres
        });
      } catch (err) {
        response.status(500).send({
          success: false,
          message: err.message,
        });
      }
    }
  );
  router.post("/get-show-by-id", authMiddleware, async (request, response) => {
    try {
      const show = await Shows.findById(request.body.showId)
      .populate("movie").
      populate("theaterId")
      response.send({
        success: true,
        message: "Show fetched Successfully",
        data:show
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });
  
module.exports =router;