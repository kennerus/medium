<template>
  <section class="section hero is-block is-fullheight-with-navbar is-light">
    <div class="container">
      <div class="columns" v-for="post in posts"
           :key="post.id">
        <PostsPost :post="post" />
      </div>
    </div>
  </section>
</template>

<script>
  import PostsPost from '../../components/Posts/PostsPost';

  export default {
    name: 'Posts',
    components: {PostsPost},
    data() {
      return {
        posts: [
          {
            id: 1,
            title: 'Название поста',
            description: 'Текст',
            claps: 0,
            createdAt: '2019-09-29T00:00:00.00Z',
            updatedAt: '2019-09-29T00:00:00.00Z',
            userId: 1
          },
          {
            id: 1,
            title: 'Название поста',
            description: 'Текст',
            claps: 0,
            createdAt: '2019-09-29T00:00:00.00Z',
            updatedAt: '2019-09-29T00:00:00.00Z',
            userId: 1
          },
          {
            id: 1,
            title: 'Название поста',
            description: 'Текст',
            claps: 0,
            createdAt: '2019-09-29T00:00:00.00Z',
            updatedAt: '2019-09-29T00:00:00.00Z',
            userId: 1
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>