<template>
  <div>
    <b-sidebar
      id="sidebar-1"
      z-index="1"
      :visible="true"
      no-header-close
      bg-variant="dark"
      text-variant="light"
      no-close-on-route-change
      width="240px"
      :body-class="$style.sidebarScrollbar"
    >
      <template v-slot:title>
        <div class="shadow">
          <div>
            Fireblaze 🔥🔥🔥
          </div>

          <div class="mt-4">
            <div class="d-flex justify-content-end align-items-center">
              <b-input
                size="sm"
                placeholder="Filter by volume name..."
                type="text"
                :class="[$style.iconPadding, 'rounded-pill mb-1']"
              />
              <SearchIcon
                class="text-dark position-absolute mr-1 mb-1"
                style="right: 24px;"
                width="18px"
              />
            </div>
          </div>
        </div>
      </template>
      <!-- content -->
      <div>
        <b-nav vertical class="my-1">
          <b-nav-item
            v-for="volume in 30"
            :key="`volume-${volume}`"
            :exact-active-class="$style.sidebarLinkActive"
            :link-classes="[
              $style.sidebarLink,
              'text-light mx-2 p-2 rounded-lg'
            ]"
            :to="'/volume/' + volume"
          >
            volume #{{ volume }}
          </b-nav-item>
          <b-nav-item
            :link-classes="[$style.sidebarLink, 'text-light']"
            disabled
            >Disabled</b-nav-item
          >
        </b-nav>
      </div>
      <template v-slot:footer>
        <div class="p-2 py-3">
          <div class="d-flex align-items-center">
            <small>Something</small>
            <span class="ml-auto">
              🆒 👍!
            </span>
          </div>
        </div>
      </template>
    </b-sidebar>

    <div :class="$style.content">
      <b-navbar toggleable="lg" variant="light" class="p-0 px-2 shadow">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
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
        </b-navbar-nav>
      </b-navbar>
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
import SearchIcon from '~/components/SearchIcon.vue'
export default {
  middleware: 'authenticated',
  components: {
    SearchIcon
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style module>
.content {
  margin-left: 240px;
}
.iconPadding {
  padding-right: 36px;
}
.sidebarLink {
  margin-top: 2px;
  margin-bottom: 2px;
}
.sidebarLink:hover {
  background-color: hsl(210, 10%, 15%);
}
.sidebarLinkActive {
  background-color: hsl(210, 10%, 12%);
}
.sidebarScrollbar::-webkit-scrollbar-track,
.sidebarScrollbar {
  background: hsl(210, 10%, 18%);
  /* firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: gray hsl(210, 10%, 15%);
}
</style>
