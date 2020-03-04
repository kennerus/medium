<template>
  <section class="section hero is-block is-fullheight-with-navbar is-light">
    <div class="container">
      <div class="columns" v-for="post in posts"
           :key="post.id">
        <PostsPost :post="post"/>
      </div>
    </div>
  </section>
</template>

<script>
  import PostsPost from '../../components/Posts/PostsPost';
  import api from "../../services/api";

  export default {
    name: 'Posts',
    components: {PostsPost},
    created() {
      this.apiPosts.getPosts()
        .then(this.getPostsHandler)
        .catch(console.log)
    },
    data() {
      const {posts: apiPosts} = api;

      return {
        apiPosts,
        posts: []
      }
    },
    methods: {
      getPostsHandler(response) {
        this.posts = response.data;
      }
    }
  }
</script>

<style scoped>

</style>