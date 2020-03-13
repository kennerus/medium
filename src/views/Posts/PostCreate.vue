<template>
  <section class="section">
    <PostForm v-model="form"
              @submit="createPost"
    />
  </section>
</template>

<script>
  import PostForm from '../../components/Posts/PostForm';
  import api from '../../services/api';
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';
  import MixinDate from '../../mixins/Common/MixinDate';

  export default {
    name: 'PostCreate',
    components: {PostForm},
    mixins: [MixinErrorHandler, MixinDate],
    data() {
      const {createPost: apiCreatePost} = api.posts;
      const {id} = this.$store.getters.user;

      return {
        apiCreatePost,
        form: {
          title: '',
          description: '',
          claps: 0,
          userId: id,
          createdAt: '',
          updateAt: '',
        }
      }
    },
    methods: {
      setDates() {
        const date = this.$_getCurrentDate();
        this.form.createdAt = this.form.updateAt = date;
      },

      createPost() {
        this.setDates();

        this.apiCreatePost(this.form)
          .then(this.createPostHandler)
          .catch(this.$_errorHandler);
      },

      createPostHandler(response) {
        this.$_showToast({message: 'Статья успешно создана', type: 'is-success'});
        this.$router.push(`/posts/${response.data.id}`);
      },
    }
  }
</script>

<style scoped>

</style>