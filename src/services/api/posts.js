import api from './api';

export default {
  /**
   * Получение постов
   *
   * @param {Object} params
   * @param {Number} params._page - страница
   * @param {Number} params._limit - количество постов на странице (по умолчанию 10)
   * @returns {Promise<AxiosResponse<Array>>}
   */
  getPosts: params => api.get('/api/posts', {params}),

  /**
   * Получение поста
   *
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
   * @param {Number} post.updateAt - дата обновления поста
   * @param {Number} post.createdAt - дата создания поста
   * @param {Number} post.claps - количество хлопков посту
   * @returns {Promise<AxiosResponse<Object>>}
   */
  createPost: post => api.post('/api/posts', post),

  /**
   * Обновление поста
   *
   * @param {Number} postId - id поста, который редактируется
   * @param post
   * @param {String} post.title - название поста
   * @param {String} post.description - текст поста
   * @param {Number} post.userId - id пользователя создавшего пост
   * @param {Number} post.updateAt - дата обновления поста
   * @param {Number} post.createdAt - дата создания поста
   * @param {Number} post.claps - количество хлопков посту
   * @return {Object}
   */
  updatePost: (postId, post) => api.put(`/api/posts/${postId}`, post),

  /**
   * Удаление поста
   *
   * @param {Number} postId - id поста, который будет удалён
   * @return {*}
   */
  deletePost: postId => api.delete(`/api/posts/${postId}`),
}