import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-4445c.firebaseio.com/",
});

export default instance;
