<template>
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
</template>

<script>
import SearchIcon from '~/components/SearchIcon.vue'
export default {
  components: {
    SearchIcon
  }
}
</script>

<style module>
.iconPadding {
  padding-right: 36px;
}
</style>
