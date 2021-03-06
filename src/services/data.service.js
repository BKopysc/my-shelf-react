import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/data/";

const getLibrary = (lib_id) => {
    //var lib_id = AuthService.getCurrentUser().libraryId;
    return axios.get(API_URL + "libraries/" + lib_id, {headers: authHeader() });
}

const getLibraryIdByUsername = (username) => {
  //var lib_id = AuthService.getCurrentUser().libraryId;
  return axios.get(API_URL + "libraries/by_user/" + username);
}

const postBook = (lib_id, book_json) => {
  return axios
  .post(API_URL + "libraries/" + lib_id + "/books", book_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const putBook = (lib_id, book_id, book_json) => {
  return axios
  .put(API_URL + "libraries/" + lib_id + "/books/" + book_id, book_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const deleteBook = (lib_id, book_id) => {
  // alert(lib_id + " " + book_id)
  return axios
  .delete(API_URL + "libraries/" + lib_id + "/books/" + book_id,{headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const getBook = (lib_id, book_id) => {
  return axios.get(API_URL + "libraries/" + lib_id + "/books/" + book_id, {headers: authHeader() });
}

const getBookReview = (lib_id, book_id) => {
  return axios.get(API_URL + "libraries/" + lib_id + "/books/" + book_id + "/book_review", {headers: authHeader() });
}

const putBookReview = (lib_id, book_id, book_rev_json) => {
  return axios
  .put(API_URL + "libraries/" + lib_id + "/books/" + book_id + "/book_review", book_rev_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const deleteBookReview = (lib_id, book_id) => {
  // alert(lib_id + " " + book_id)
  return axios
  .delete(API_URL + "libraries/" + lib_id + "/books/" + book_id + "/book_review",{headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const postFilm = (lib_id, film_json) => {
  return axios
  .post(API_URL + "libraries/" + lib_id + "/films", film_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const putFilm = (lib_id, film_id, film_json) => {
  return axios
  .put(API_URL + "libraries/" + lib_id + "/films/" + film_id, film_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const deleteFilm = (lib_id, film_id) => {
  // alert(lib_id + " " + book_id)
  return axios
  .delete(API_URL + "libraries/" + lib_id + "/films/" + film_id,{headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const getFilm = (lib_id, film_id) => {
  return axios.get(API_URL + "libraries/" + lib_id + "/films/" + film_id, {headers: authHeader() });
}

const getFilmReview = (lib_id, film_id) => {
  return axios.get(API_URL + "libraries/" + lib_id + "/films/" + film_id + "/film_review", {headers: authHeader() });
}

const putFilmReview = (lib_id, film_id, film_rev_json) => {
  return axios
  .put(API_URL + "libraries/" + lib_id + "/films/" + film_id + "/film_review", film_rev_json, {headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}

const deleteFilmReview = (lib_id, film_id) => {
  // alert(lib_id + " " + book_id)
  return axios
  .delete(API_URL + "libraries/" + lib_id + "/films/" + film_id + "/film_review",{headers: authHeader()})
  .then((response) => {
    return response.data; 
  });
}




const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const DataService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getLibrary,
  postBook,
  deleteBook,
  getBook,
  putBook,
  getBookReview,
  putBookReview,
  deleteBookReview,
  getFilm,
  postFilm,
  deleteFilm,
  putFilm,
  getFilmReview,
  putFilmReview,
  deleteFilmReview,
  getLibraryIdByUsername
};
export default DataService;