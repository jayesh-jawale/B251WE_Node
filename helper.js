import { client } from "./index.js";

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

  export {getMoviesByID, getMoviesByRating, createMovies, updateMovie, deleteMovieByIDAndName, deleteMovieByID}