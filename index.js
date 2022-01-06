// const express = require('express')   //commonjs
// const {MongoClient} = require("mongodb")   //commonjs

import express from "express";  //type: "module"
import {MongoClient} from "mongodb";  //type: "module"
import dotenv from "dotenv";

dotenv.config(); // getting all env keys

const app = express();    // Alternative to express  - hapi

//  app.use -> Intercept every request
//  app.use(express.json()); // Every request in body is parsed as JSON
//  express.json(); Inbuilt Middleware

const INITIAL_MOVIES = [
    {
      id: '100',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg',
      name: 'Avengers: Endgame',
      rating: 8.5,
      description: 'Stellan Skarsgård, and Samuel L. Jackson. In the film, Nick Fury and the spy agency S.H.I.E.L.D. recruit Tony Stark, Steve Rogers, Bruce Marvels The Avengers[6] (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland),[3][7] or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion',
      trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c'
    },
    {
      id: '101',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
      name: 'Interstellar',
      rating: 8,
      description: 'Interstellar is a 2014 epic science fiction film co-written, directed and produced by Christopher Nolan. It stars Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen Burstyn, and Michael Caine. Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humanity.',
      trailer: 'https://www.youtube.com/embed/zSWdZVtXT7Ecelerometer'
    },
    {
      id: '102',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      name: 'Inception',
      rating: 9.2,
      description: 'Inception is a 2010 science fiction action film[4][5][6] written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another persons idea into a targets subconscious.',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0'
    },
    {
      id: '103',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Tenet_movie_poster.jpg/220px-Tenet_movie_poster.jpg',
      name: 'Tenet',
      rating: 7.8,
      description: 'Tenet is a 2020 science fiction action thriller film written and directed by Christopher Nolan, who produced it with Emma Thomas. A co-production between the United Kingdom and United States, it stars John David Washington, Robert Pattinson, Elizabeth Debicki, Dimple Kapadia, Michael Caine, and Kenneth Branagh.',
      trailer: 'https://www.youtube.com/embed/AZGcmvrTX9M'
    },
    {
      id: '104',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Prestige_poster.jpg/220px-Prestige_poster.jpg',
      name: 'The Prestige',
      rating: 8.8,
      description: 'The Prestige is a 2006 mystery thriller film directed by Christopher Nolan, written by Nolan and his brother Jonathan, based on the 1995 novel of the same name by Christopher Priest. It follows Robert Angier and Alfred Borden',
      trailer: 'https://www.youtube.com/embed/RLtaA9fFNXU'
    },
    {
      id: '105',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/The_Illusionist_Poster.jpg/220px-The_Illusionist_Poster.jpg',
      name: 'The Illusionist',
      rating: 9.5,
      description: 'The Illusionist is a 2006 American romantic mystery film written and directed by Neil Burger and starring Edward Norton, Paul Giamatti, and Jessica Biel.',
      trailer: 'https://www.youtube.com/embed/i0xO64icGSY'
    },
  ]

// Create a connection
// const MONGO_URL = "mongodb://localhost" //mongodb:localhost:27017

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL)
  await client.connect(); //promise
  console.log("Mongo DB Connected");
  return client;
}

const client = await createConnection();

// const PORT = 9000
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send("Hi there! My name is Jayesh");
});

// Get Movies by Rating
app.get('/movies', async(req, res) => {
  const filter = req.query;
  if(filter.rating) {
    filter.rating = +filter.rating;
  }

  const movies = await client
  .db("test")
  .collection("movies")
  .find(filter)
  .toArray();

  res.send(movies);
  console.log(movies);
})

// Get movies by Id
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await client
                .db("test")
                .collection("movies")
                .findOne({ id: id })

  console.log(movie);
  movie ? res.send(movie) : res.status(404).send({msg : 'Movie not found'})
  })

// Add Movies
app.post('/movies', express.json(), async(req, res) => {
  const data = req.body;
  console.log(data);
  const addedMovies = await client
                      .db("test")
                      .collection("movies")
                      .insertMany(data);

  res.send(addedMovies);
})

// Update movies
// app.put('/movies/:id', async(req, res) => {
//   const {id} = req.params
//   const data = req.body;

//   const updateMovies = await client
//                       .db("test")
//                       .collection("movies")
//                       .updateOne({id: id}, {$set:data});

//   res.send(updateMovies);
// })

  // Delete movies by Id
    app.delete('/movies/:id', async (req, res) => {
      const { id } = req.params;
  
      const deleteMovieById = await client
                          .db("test")
                          .collection("movies")
                          .deleteOne({id : id})
  
      console.log(deleteMovieById)
      deleteMovieById ? res.send(deleteMovieById) : res.send({ msg : 'Movie not found'})
    })

  // Delete movies by Id and Name
  app.delete('/movies/:id?name', async (req, res) => {
    const { id } = req.params;

    const name = req.query;
    if(name.name) {
      name.name = name.name
    }
    const deleteMovie = await client
                        .db("test")
                        .collection("movies")
                        .deleteOne({id : id}, name)

    console.log(deleteMovie)
    deleteMovie ? res.send(deleteMovie) : res.send({ msg : 'Movie not found'})
  })

app.listen(PORT, () => console.log('Started'))