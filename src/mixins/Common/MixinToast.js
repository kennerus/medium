

export default {
  methods: {
    /**
     * @param {Object} data
     * @param {String} data.type - тип всплывашки
     * @param {String} data.message - текст
     * @param {String} data.position - текст
     * @param {Number} data.duration - текст
     * @param {Boolean} data.queue - становится в очередь
     * @param {String} data.container - текст
     */
    $_showToast(data) {
      this.$buefy.toast.open(data);
    },
  }
}