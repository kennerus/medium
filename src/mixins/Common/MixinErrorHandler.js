import MixinToast from './MixinToast';

export default {
  mixins: [MixinToast],
  methods: {
    $_errorHandler(error) {
      const {data: message} = error.response;
      this.$_showToast({type: 'is-danger', message})
    }
  }
}