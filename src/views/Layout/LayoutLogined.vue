<template :key="$store.getters.isAuthenticated)">
  <div>
    <BNavbar :shadow="true" class="is-info">
      <template slot="start">
        <BNavbarItem tag="router-link" to="/">
          Home
        </BNavbarItem>
      </template>

      <template slot="end">
        <BNavbarItem tag="div" class="buttons">
          <button class="button is-light"
                  type="button"

                  @click="logout"
          >
            Exit
          </button>
        </BNavbarItem>
      </template>
    </BNavbar>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import BNavbarItem from 'buefy/src/components/navbar/NavbarItem';
  import BNavbar from 'buefy/src/components/navbar/Navbar';
  import MixinToast from '../../mixins/Common/MixinToast';

  export default {
    name: 'LayoutLogined',
    components: {BNavbar, BNavbarItem},
    mixins: [MixinToast],
    methods: {
      logout() {
        this.$store.dispatch('AUTH_LOGOUT');

        this.$_showToast({
          message: 'Вы вышли из системы',
          type: 'is-success',
        });

        this.$router.push({name: 'login'});
      },
    }
  }
</script>

<style scoped>

</style>