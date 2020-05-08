<template>
  <b-navbar toggleable="lg" variant="light" class="p-0 px-2 shadow">
    <b-navbar-nav>
      <b-nav-item to="/">Home</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <HeaderUserDropdown />
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import HeaderUserDropdown from '~/components/HeaderUserDropdown.vue'
export default {
  components: {
    HeaderUserDropdown
  }
}
</script>
