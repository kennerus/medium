<template>
  <section class="hero is-fullheight-with-navbar is-light">
    <div class="hero-body">
      <div class="container ">
        <form @submit.prevent="loginUser">
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
                    v-model="email"
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
  import api from "../../services/api";
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';

  export default {
    name: 'Login',
    components: {BButton, BInput, BField},
    mixins: [MixinErrorHandler],
    computed: {
      isFormValid() {
        return Boolean(this.email && this.password);
      },
    },
    data() {
      const {login: apiLogin} = api.authentication;

      return {
        apiLogin,
        email: '',
        password: ''
      }
    },
    methods: {
      loginUser() {
        if (this.isFormValid) {
          const {email, password} = this;

          this.apiLogin({email, password})
            .then(this.loginUserHandler)
            .catch(this.$_errorHandler);
        } else {
          this.$_showToast(this.formToast());
        }
      },

      loginUserHandler(response) {
        this.$_showToast(this.formToast());
        this.$router.push('/');
      },

      formToast() {
        let message = 'Заполните поля логина и пароля!';
        let type = 'is-danger';

        if (this.isFormValid) {
          message = 'Вы успешно авторизованы!';
          type = 'is-success';
        }

        return {
          message, type
        }
      },
    },
  }
</script>

<style scoped>

</style>