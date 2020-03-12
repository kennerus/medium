<template>
  <section class="hero is-fullheight-with-navbar is-light">
    <div class="hero-body">
      <div class="container ">
        <form @submit.prevent="registerUser">
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

          <div>
            <BRadio v-model="role"
                    name="role"
                    native-value="reader"
            >
              Читатель
            </BRadio>

            <BRadio v-model="role"
                    name="role"
                    native-value="writer"
            >
              Писатель
            </BRadio>
          </div>

          <BButton native-type="submit"
                   :disabled="isFormValid === false"
          >
            Зарегистрироваться
          </BButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import api from "../../services/api";
  import MixinErrorHandler from '../../mixins/Common/MixinErrorHandler';

  export default {
    name: 'SignUp',
    mixins: [MixinErrorHandler],
    computed: {
      isFormValid() {
        return Boolean(this.email && this.password && this.role);
      },
    },
    data() {
      const {register: apiRegister} = api.authentication;

      return {
        apiRegister,
        email: '',
        password: '',
        role: 'reader',
      }
    },

    methods: {
      registerUser() {
        if (this.isFormValid) {
          const {email, password, role} = this;

          this.apiRegister({email, password, role})
            .then(this.registerUserHandler)
            .catch(this.$_errorHandler)
        } else {
          this.$_showToast(this.formToast());
        }
      },

      registerUserHandler(response) {
        this.$_showToast(this.formToast());
        this.$router.push('/');
      },


      formToast() {
        let message = 'Заполните все поля!';
        let type = 'is-danger';

        if (this.isFormValid) {
          message = 'Вы успешно зарегистрировались!';
          type = 'is-success';
        }

        return {
          message, type
        }
      }
    }
  }
</script>

<style scoped>

</style>