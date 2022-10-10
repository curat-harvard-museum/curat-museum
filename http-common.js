import axios from "axios";

export default axios.create({
  baseURL: "https://api.harvardartmuseums.org",
  headers: {
    "Content-type": "application/json",
  },
});
