<template>
  <b-nav-item-dropdown href="" right no-caret>
    <template v-slot:button-content>
      <b-avatar size="36px"></b-avatar>
    </template>
    <b-dropdown-item-button
      class="p-0 p-1"
      link-class="p-0 pl-1"
      @click="logout"
    >
      Sign Out
    </b-dropdown-item-button>
  </b-nav-item-dropdown>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
