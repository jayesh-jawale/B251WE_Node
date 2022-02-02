import { client } from "./index.js";
import bcrypt from "bcrypt";

 async function getMoviesByID(id) {
  return client
    .db("test")
    .collection("movies")
    .findOne({ id: id });
}

 async function getMoviesByRating(filter) {
    return client
      .db("test")
      .collection("movies")
      .find(filter)
      .toArray();
  }

 async function createMovies(data) {
    return client
      .db("test")
      .collection("movies")
      .insertMany(data);
  }

  async function createUser(data) {
    return client
      .db("test")
      .collection("users")
      .insertOne(data);
  }

  async function getUserByName(username) {
    return await client
    .db("test")
    .collection("users")
    .findOne({username : username});
  }

  async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  async function updateMovie(id, updatedMovie) {
    return client
      .db("test")
      .collection("movies")
      .updateOne({ id: id }, { $set: updatedMovie });
  }

  function deleteMovieByIDAndName(id, name) {
    return client
      .db("test")
      .collection("movies")
      .deleteOne({ id: id }, name);
  }
  
  function deleteMovieByID(id) {
    return client
      .db("test")
      .collection("movies")
      .deleteOne({ id: id });
  }

  export {getMoviesByID, getMoviesByRating, createMovies,
     updateMovie, deleteMovieByIDAndName, deleteMovieByID, createUser, genPassword,
    getUserByName}