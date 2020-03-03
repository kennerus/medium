<template>
  <div>
    <BNavbar :shadow="true" class="is-info">
      <template slot="start">
        <BNavbarItem tag="router-link" to="/">
          Home
        </BNavbarItem>
      </template>

      <template slot="end">
        <BNavbarItem tag="div" class="buttons">
          <router-link class="button is-primary" to="/sign-up">
            <strong>Sign up</strong>
          </router-link>

          <router-link class="button is-light" to="/login">
            Log in
          </router-link>
        </BNavbarItem>
      </template>
    </BNavbar>

    <main>
      <router-view/>
    </main>
  </div>
</template>


<script>
  import BNavbar from 'buefy/src/components/navbar/Navbar';
  import BNavbarItem from 'buefy/src/components/navbar/NavbarItem';

  export default {
    name: 'LayoutAuthentication',
    components: {BNavbarItem, BNavbar}
  }
</script>

<style scoped>

</style>