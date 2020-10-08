import axios from "axios";

const instance = axios.create({
  baseURL: "https://murmuring-wildwood-42083.herokuapp.com/", //THE API URL {CLOUD FUNCTION}
});

export default instance;
