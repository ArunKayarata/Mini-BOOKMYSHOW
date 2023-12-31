const router = require("express").Router();
const Movies = require("../Models/moviesmodel");
const authMiddleware = require("../Middlewares/authMiddleware");

require("dotenv").config();

router.post('/add-movie',authMiddleware,async(req,res)=>{
    try{
        const movie= new Movies(req.body);
        await movie.save();
        res.status(200).send({
            success: true,
            message: "Movie added successfully"
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})

router.get('/get-all-movies',authMiddleware,async(req,res)=>{
    try{
        const movie= await Movies.find();
     
        res.status(200).send({
            success: true,
            message: "Movie fetched successfully",
            data:movie
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})
router.put('/update-movie',authMiddleware,async(req,res)=>{
    try{
      await Movies.findByIdAndUpdate(req.body.movieId,req.body)
     
        res.status(200).send({
            success: true,
            message: "Movie updated successfully"
            
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})

router.delete('/delete-movie',authMiddleware,async(req,res)=>{
    try{
     
      await Movies.findByIdAndDelete(req.query.movieId);
       
        res.status(200).send({
            success: true,
            message: "Movie deleted successfully"    
          });

    }catch(err){
        res.status(500).send({
            success:false,
            message:"internal error"
        })
    }
})

router.get("/get-movie-by-id/:movieId", authMiddleware, async (request, response) => {
    try {
      const movie = await Movies.findById(request.params.movieId);
      response.send({
        success: true,
        message: "Movie Fetched Successfully",
        data: movie
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  });
module.exports =router