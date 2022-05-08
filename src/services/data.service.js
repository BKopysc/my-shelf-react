import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/data/";

const getLibrary = (lib_id) => {
    //var lib_id = AuthService.getCurrentUser().libraryId;
    return axios.get(API_URL + "libraries/" + lib_id, {headers: authHeader() });
}

const postBook = (lib_id, book_json) => {
  return axios
  .post(API_URL + "libraries/" + lib_id + "/books", book_json, {headers: authHeader()})
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
  postBook
};
export default DataService;