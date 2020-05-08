<template>
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
          <SidebarSearchInput />
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
          :link-classes="[$style.sidebarLink, 'text-light mx-2 p-2 rounded-lg']"
          :to="'/volume/' + volume"
        >
          volume #{{ volume }}
        </b-nav-item>
        <b-nav-item :link-classes="[$style.sidebarLink, 'text-light']" disabled
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
</template>

<script>
import SidebarSearchInput from '~/components/SidebarSearchInput.vue'
export default {
  components: {
    SidebarSearchInput
  }
}
</script>
<style module>
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
