<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{post.title}}</h1>

      <div v-html="post.description"></div>
    </div>
  </section>
</template>

<script>
  import api from '../../services/api';
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';

  export default {
    name: 'Post',
    mixins: [MixinErrorHandler],
    created() {
      this.apiGetPost(this.postId)
        .then(this.getPostHandler)
        .catch(this.$_errorHandler);
    },
    data() {
      const {getPost: apiGetPost} = api.posts;
      const {id: postId} = this.$route.params;

      return {
        postId,
        apiGetPost,
        post: {
          title: '',
          description: '',
          userId: null,
          claps: null,
          createdAt: '',
          updateAt: '',
        }
      }
    },
    methods: {
      getPostHandler(response) {
        this.post = response.data;
      },
    }
  }
</script>

<style scoped>

</style>