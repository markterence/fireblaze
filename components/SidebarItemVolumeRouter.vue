<template>
  <b-nav-item
    :exact-active-class="$style.sidebarLinkActive"
    :link-classes="[$style.sidebarLink, 'text-light mx-2 p-2 rounded-lg']"
    :to="'/volume/' + volume.id"
  >
    <slot> {{ volume.name }} </slot>
  </b-nav-item>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['volume']
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
</style>
