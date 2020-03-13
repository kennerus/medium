import api from "./api";

export default {
  getUser: email => api.get('/api/users', {params: {email}}),
}