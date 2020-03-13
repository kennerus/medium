<template>
  <article class="column is-full">
    <div class="card">
      <header class="card-header">
        <h2 class="card-header-title">
          <router-link :to="`/posts/${post.id}`"
                       class="card-header-title is-4"
          >
            {{post.title}}
          </router-link>
        </h2>
      </header>

      <div class="card-content">
        <router-link :to="`/posts/${post.id}`"
                     class="subtitle is-6"
                     v-html="post.description"
        ></router-link>
      </div>

      <footer class="card-footer level">
        <span class="level-left">{{postCreatedAt()}}</span>

        <div class="level-right">
          <BButton type="is-light"
                   class="level-item"
                   v-if="canClap"

                   @click="clapToPost"
          >
            <BIcon pack="fas"
                   icon="thumbs-up"
                   type="is-info"
            />
            <span>{{post.claps}}</span>
          </BButton>

          <template v-if="canChangePost">
            <router-link class="button is-light level-item"
                         :to="`/posts/edit/${post.id}`"
            >
              <BIcon pack="fas"
                     icon="edit"
                     type="is-info"
              />
              <span>Изменить</span>
            </router-link>

            <BButton class="button is-light level-item"

                     @click="removePost"
            >
              <BIcon pack="fas"
                     icon="trash-alt"
                     type="is-info"
              />
              <span>Удалить</span>
            </BButton>
          </template>
        </div>
      </footer>
    </div>
  </article>
</template>

<script>
  import BButton from 'buefy/src/components/button/Button';
  import BIcon from 'buefy/src/components/icon/Icon';
  import MixinDate from '../../mixins/Common/MixinDate';
  import MixinDeclensions from '../../mixins/Common/MixinDeclensions';
  import {mapGetters} from 'vuex';

  export default {
    name: 'PostsPost',
    components: {BIcon, BButton},
    mixins: [MixinDate, MixinDeclensions],
    props: {
      post: {
        type: Object,
        default: () => ({
          id: 1,
          title: 'Название поста',
          description: 'Текст',
          claps: 0,
          createdAt: '2019-09-29T00:00:00.00Z',
          updateAt: '2019-09-29T00:00:00.00Z',
          userId: 1
        })
      },
    },
    computed: {
      ...mapGetters(['user']),

      canChangePost() {
        return this.user.role === 'writer' && this.user.id === this.post.userId;
      },

      canClap() {
        return this.user.role === 'reader';
      }
    },
    methods: {
      postCreatedAt() {
        const {difference, declension: currentDeclension} = this.$_datesDifference(this.post.updateAt);
        const declension = this.$_declension(difference, currentDeclension);

        return `${difference} ${declension} назад`;
      },

      removePost() {
        this.$buefy.dialog.confirm({
          message: 'Подтвердите удаление статьи',
          onConfirm: () => this.$emit('click', this.post),
        });
      },

      clapToPost() {
        this.$emit('clap', this.post);
      },
    },
  }
</script>

<style scoped>
  .card-footer {
    padding: 0.75rem 1.5rem;
    border: none;
  }
</style>