<template>
  <section class="section hero is-block is-fullheight-with-navbar is-light">
    <div class="container">
      <router-link to="/posts/create"
                   class="button is-outlined is-link"
                   style="display: inline-block; margin-bottom: 30px;"
                   v-if="canCreatePost()"
      >
        Создать статью
      </router-link>

      <div class="columns"
           v-for="post in posts"
           :key="post.id"
      >
        <PostsPost :post="post"

                   @click="removePost"
                   @clap="clapToPost"
        />
      </div>

      <footer>
        <BPagination :total="postsTotal"
                     :current.sync="currentPage"
                     :per-page="5"
        >
          <BPaginationButton slot-scope="props"
                             :page="props.page"
                             :id="`page${props.page.number}`"
                             tag="router-link"
                             :to="`/?_page=${props.page.number}`"
          >
            {{props.page.number}}
          </BPaginationButton>

          <BPaginationButton
            slot="previous"
            slot-scope="props"
            :page="props.page"
            tag="router-link"
                             :to="`/?_page=${props.page.number}`"
          >
            Previous
          </BPaginationButton>

          <BPaginationButton
            slot="next"
            slot-scope="props"
            :page="props.page"
            tag="router-link"
                             :to="`/?_page=${props.page.number}`"
          >
            Next
          </BPaginationButton>
        </BPagination>
      </footer>
    </div>
  </section>
</template>

<script>
  import PostsPost from '../../components/Posts/PostsPost';
  import api from "../../services/api";
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';
  import BButton from 'buefy/src/components/button/Button';
  import {mapState} from 'vuex';
  import BPagination from 'buefy/src/components/pagination/Pagination';
  import BPaginationButton from 'buefy/src/components/pagination/PaginationButton';

  export default {
    name: 'Posts',
    components: {BPaginationButton, BPagination, BButton, PostsPost},
    mixins: [MixinErrorHandler],
    computed: {
      ...mapState(['user']),

      currentPage() {
        return this.$route.query._page ? Number(this.$route.query._page) : 1;
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler(value) {
          this.apiGetPosts({_page: this.currentPage, _limit: 5})
            .then(this.getPostsHandler)
            .catch(this.$_errorHandler);
        }
      },
    },
    data() {
      const {deletePost: apiDeletePost, getPosts: apiGetPosts, updatePost: apiUpdatePost} = api.posts;

      return {
        apiDeletePost,
        apiGetPosts,
        apiUpdatePost,
        posts: [],
        postsTotal: null,
      }
    },
    methods: {
      canCreatePost() {
        return this.user.role === 'writer';
      },

      getPostsHandler(response) {
        const {data, headers} = response;
        this.posts = data;
        this.postsTotal = Number(headers['x-total-count']);
      },

      removePostHandler(response, postId) {
        this.posts = this.posts.filter(post => post.id !== postId);
      },

      removePost({id}) {
        this.apiDeletePost(id)
          .then(response => this.removePostHandler(response, id))
          .catch(this.$_errorHandler);
      },

      clapToPostHandler(response) {
        const {data} = response;
        const postIndex = this.posts.findIndex(post => post.id === data.id);
        this.$set(this.posts, postIndex, data);
      },

      clapToPost(post) {
        const postCopy = Object.assign({}, post);
        postCopy.claps += 1;

        this.apiUpdatePost(postCopy.id, postCopy)
          .then(this.clapToPostHandler)
          .catch(this.$_errorHandler);
      },


    }
  }
</script>

<style scoped>

</style>