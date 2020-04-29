<template>
  <div>
    <b-sidebar
      id="sidebar-1"
      z-index="1"
      :visible="true"
      no-header-close
      shadow
      bg-variant="dark"
      text-variant="light"
      no-close-on-route-change
      width="240px"
    >
      <template v-slot:title>
        <div>
          Firebase
        </div>
      </template>
      <!-- content -->
      <div class="mt-4">
        <div class="shadow border-bottom">
          <div class="px-2">
            <b-input
              size="sm"
              placeholder="Filter by name..."
              type="text"
              class="rounded-pill mb-1"
            ></b-input>
          </div>
        </div>
        <b-nav vertical class="my-1">
          <b-nav-item link-classes="text-light" :to="'/volume/2'">
            Active
          </b-nav-item>
          <b-nav-item link-classes="text-light">Link</b-nav-item>
          <b-nav-item link-classes="text-light">Another Link</b-nav-item>
          <b-nav-item link-classes="text-light" disabled>Disabled</b-nav-item>
        </b-nav>
      </div>
      <template v-slot:footer>
        <div>
          Something Cool !
        </div>
      </template>
    </b-sidebar>

    <div :class="$style.content">
      <b-navbar toggleable="lg" variant="light" class="p-0 px-2 shadow">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right no-caret>
            <template v-slot:button-content>
              <b-avatar size="36px"></b-avatar>
            </template>
            <b-dropdown-item class="p-0 p-1" link-class="p-0 pl-1"
              >Administration</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item class="p-0 p-1" link-class="p-0 pl-1"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <b-container fluid>
        <div class="py-3">
          <NuxtChild :key="$route.params.id" />
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated'
}
</script>

<style module>
.content {
  margin-left: 240px;
}
</style>
