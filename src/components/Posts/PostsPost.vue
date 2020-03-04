<template>
  <article class="column is-full">
    <div class="card">
      <header class="card-header">
        <h2 class="card-header-title">
          <router-link :to="`/${post.id}`"
                       class="card-header-title is-4"
          >
            {{post.title}}
          </router-link>
        </h2>
      </header>

      <div class="card-content">
        <router-link :to="`/${post.id}`" class="subtitle is-6">
          {{post.description}}
        </router-link>
      </div>

      <footer class="card-footer level">
        <span class="level-left">{{postCreatedAt()}}</span>

        <div class="level-right">
          <BButton type="is-light" class="level-item">
            <BIcon pack="fas"
                   icon="sign-language"
                   type="is-info"
            />
          </BButton>

          <BButton type="is-light" class="level-item">
            <BIcon pack="fas"
                   icon="edit"
                   type="is-info"
            />
            <span>Изменить</span>
          </BButton>

          <BButton type="is-light" class="level-item">
            <BIcon pack="fas"
                   icon="trash-alt"
                   type="is-info"
            />
            <span>Удалить</span>
          </BButton>
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
    methods: {
      postCreatedAt() {
        const daysDifference = this.$_datesDifference(this.post.updateAt);
        const declension = this.$_declension(daysDifference, this.dateDeclension);

        return `${daysDifference} ${declension} назад`;
      }
    }
  }
</script>

<style scoped>
  .card-footer {
    padding: 0.75rem 1.5rem;
    border: none;
  }
</style>