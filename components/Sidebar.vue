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
      <template>
        <div class="shadow">
          <div>
            Fireblaze 🔥🔥🔥
          </div>

          <div class="mt-4">
            <SidebarSearchInput />
          </div>
        </div>
      </template>
    </template>

    <!-- content -->
    <div>
      <b-nav vertical class="my-1">
        <SidebarItemVolumeRouter
          v-for="volume in 30"
          :key="`volume-${volume}`"
          :volume="{ name: `volume # ${volume}`, id: volume }"
        />
      </b-nav>
    </div>
    <template v-slot:footer>
      <SidebarFooter />
    </template>
  </b-sidebar>
</template>

<script>
import SidebarSearchInput from '~/components/SidebarSearchInput.vue'
import SidebarItemVolumeRouter from '~/components/SidebarItemVolumeRouter.vue'
import SidebarFooter from '~/components/SidebarFooter.vue'
export default {
  components: {
    SidebarSearchInput,
    SidebarItemVolumeRouter,
    SidebarFooter
  }
}
</script>
<style module>
.sidebarScrollbar::-webkit-scrollbar-track,
.sidebarScrollbar {
  background: hsl(210, 10%, 18%);
  /* firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: gray hsl(210, 10%, 15%);
}
</style>
