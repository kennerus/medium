<template>
  <section class="hero is-fullheight-with-navbar is-light">
    <div class="hero-body">
      <div class="container ">
        <form @submit.prevent>
          <h2 class="title is-2">Авторизуйтесь</h2>

          <BField label="Email"
                  label-position="on-border"
                  class=""
          >
            <BInput type="email"
                    id="login"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)[a-zA-Z]$"
                    required
                    validation-message="Enter e-mail"
                    v-model="login"
            >
            </BInput>
          </BField>

          <BField label="Password"
                  label-position="on-border"
                  class=""
          >
            <BInput type="password"
                    id="password"
                    v-model="password"
                    required
                    minlength="6"
                    validation-message="Min length 6 symbols"
                    :password-reveal="true"
                    icon-pack="fas"
            >
            </BInput>
          </BField>

          <BButton native-type="submit"
                   :disabled="isFormValid === false"
          >
            Войти
          </BButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import BField from 'buefy/src/components/field/Field';
  import BInput from 'buefy/src/components/input/Input';
  import BButton from 'buefy/src/components/button/Button';

  export default {
    name: 'Login',
    components: {BButton, BInput, BField},
    computed: {
      isFormValid() {
        return Boolean(this.login && this.password);
      },
    },
    data() {
      return {
        login: '',
        password: ''
      }
    },
    methods: {
      login() {
        let message = 'Заполните поля логина и пароля!';
        let type = 'is-danger';

        if (this.isFormValid) {
          message = 'Вы успешно авторизованы!';
          type = 'is-success';
          this.$router.push('/');
        }
        this.$buefy.toast.open({
          message,
          type
        });

        const users = [
          {
            id: 1,
            login: 'writer@mail.com',
            password: 123456,
            role: 'writer',
          },
          {
            id: 1,
            login: 'reader@mail.com',
            password: 123456,
            role: 'reader',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>