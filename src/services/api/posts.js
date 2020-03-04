import api from "./api";

export default {
  /**
   * Получение постов
   *
   * @returns {Promise<AxiosResponse<Array>>}
   */
  getPosts: () => api.get('/api/posts'),
  
  /**
   * Получение поста
   * @param {Number} postId - id поста
   * @returns {Promise<AxiosResponse<Object>>}
   */
  getPost: postId => api.get(`/api/posts/${postId}`),
  
  /**
   * Создание поста
   *
   * @param {Object} post
   * @param {String} post.title - название поста
   * @param {String} post.description - текст поста
   * @param {Number} post.userId - id пользователя создавшего пост
   * @returns {Promise<AxiosResponse<T>>}
   */
  createPost: post => api.post('/api/posts', post),
  
  updatePost: (postId, post) => api.put(`/api/posts/${postId}`, post),
}