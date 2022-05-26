import express from "express";
import { getMoviesByID, getMoviesByRating, createMovies, updateMovie, deleteMovieByIDAndName, deleteMovieByID }
 from "./helper.js";
 import { auth } from "./middleware/auth.js";
 import jwt from "jsonwebtoken";

const router = express.Router();

// Get Movies by Rating
router.route('/').get(async(req, res) => {
    const filter = req.query;
    if(filter.rating) {
      filter.rating = +filter.rating;
    }
  
    const movies = await getMoviesByRating(filter);
    res.send(movies);
    console.log(movies);
  })
  
  // Get movies by Id
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const movie = await getMoviesByID(id)
  
    console.log(movie);
    movie ? res.send(movie) : res.status(404).send({msg : 'Movie not found'})
    })

    // Add Movies
router.post('/', express.json(), async(req, res) => {
    const data = req.body;
    console.log(data);
    const addedMovies = await createMovies(data);
  
    res.send(addedMovies);
  })

  // Update movies
router.put('/:id', async(req, res) => {
    const {id} = req.params
    const updatedMovie = req.body;
  
    const updateMovies = await updateMovie(id, updatedMovie);
            
    res.send(updateMovies);
  })

   // Delete movies by Id
   router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deleteMovieById = await deleteMovieByID(id)

    console.log(deleteMovieById)
    deleteMovieById ? res.send(deleteMovieById) : res.send({ msg : 'Movie not found'})
  })

// Delete movies by Id and Name
router.delete('/:id?name', async (req, res) => {
  const { id } = req.params;

  const name = req.query;
  if(name.name) {
    name.name = name.name
  }
  const deleteMovie = await deleteMovieByIDAndName(id, name)

  console.log(deleteMovie)
  deleteMovie ? res.send(deleteMovie) : res.send({ msg : 'Movie not found'})
})

export const moviesRouter = router;