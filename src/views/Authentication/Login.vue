<template>
  <form class="container" >
    <BField label="Email"
            for="login"
            label-position="on-border"
    >
      <BInput type="email"
              id="login"
              pattern=""
              required
              validation-message="Enter e-mail"
              v-model="login"
      >
      </BInput>
    </BField>

    <BField label="Password"
            for="password"
            label-position="on-border"
    >
      <BInput type="password"
              id="password"
              v-model="password"
              required
              validation-message="Min length 6 symbols"
              :password-reveal="true"
              icon-pack="fas"
      >
      </BInput>
    </BField>
  </form>
</template>

<script>
  import BField from 'buefy/src/components/field/Field';
  import BInput from 'buefy/src/components/input/Input';

  export default {
    name: 'Login',
    components: {BInput, BField},
    data() {
      return {
        login: '',
        password: ''
      }
    }
  }
</script>

<style scoped>

</style>