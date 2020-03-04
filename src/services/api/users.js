import api from "./api";

export default {
  authorization: user => api.post(`/api/login`, user),
}