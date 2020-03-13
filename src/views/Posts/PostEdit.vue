<template>
  <section class="section">
    <PostForm  v-model="form"
               @submit="updatePost"
    />
  </section>
</template>

<script>
  import PostForm from '../../components/Posts/PostForm';
  import api from '../../services/api';
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';
  import MixinDate from '../../mixins/Common/MixinDate';

  export default {
    name: 'PostEdit',
    components: {PostForm},
    mixins: [MixinErrorHandler, MixinDate],
    created() {
      this.apiGetPost(this.postId)
        .then(this.getPostHandler)
        .catch(this.$_errorHandler);
    },
    data() {
      const {updatePost: apiUpdatePost, getPost: apiGetPost} = api.posts;
      const {id: postId} = this.$route.params;

      return {
        apiUpdatePost,
        apiGetPost,
        postId,
        form: {
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
        this.form = response.data;
      },

      setDates() {
        this.form.updateAt = this.$_getCurrentDate();
      },

      updatePost() {
        this.apiUpdatePost(this.postId, this.form)
          .then(this.updatePostHandler)
          .catch(this.$_errorHandler);
      },

      updatePostHandler(response) {
        this.$_showToast({message: 'Статья успешно отредактирована', type: 'is-success'});
        this.$router.push(`/posts/${response.data.id}`);
      },
    }
  }
</script>

<style scoped>

</style>