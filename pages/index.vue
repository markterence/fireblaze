<template>
  <div>
    <Sidebar />
    <div :class="$style.content">
      <HeaderNav />

      <b-container fluid>
        <div class="py-3">
          <b-alert show variant="warning" class="border-warning"
            >This is a work in progress</b-alert
          >
          <NuxtChild :key="$route.params.id" />
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
import Sidebar from '~/components/Sidebar.vue'
import HeaderNav from '~/components/HeaderNav.vue'
export default {
  middleware: 'authenticated',
  components: {
    Sidebar,
    HeaderNav
  }
}
</script>

<style module>
.content {
  margin-left: 240px;
}
</style>
