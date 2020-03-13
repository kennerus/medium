<template>
  <form class="container" @submit.prevent="validateForm">
    <h1 class="title">Создание статьи</h1>

    <BField >
      <BInput type="text"
              id="title"
              :pattern="inputPattern"
              required
              validation-message="Введите заголовок поста"
              v-model="value.title"
      />
    </BField>

    <BField >
      <VueEditor v-model="value.description"/>
    </BField>

    <BButton native-type="submit"
             type="is-primary"
    >
      Сохранить
    </BButton>
  </form>
</template>

<script>
  import BField from 'buefy/src/components/field/Field';
  import BInput from 'buefy/src/components/input/Input';
  import { VueEditor } from "vue2-editor";
  import BButton from 'buefy/src/components/button/Button';

  export default {
    name: 'PostForm',
    components: {BButton, BInput, BField, VueEditor},
    props: {
      value: {
        type: Object
      },
    },
    data() {
      return {
        inputPattern: '[a-zA-Zа-яА-ЯёЁ0-9 %:,.?<>]{1,}'
      }
    },
    methods: {
      validateForm() {
        if (this.value.title && this.value.description) {
          this.$emit('submit');
        }
      }
    }
  }
</script>

<style scoped>

</style>