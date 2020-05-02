<template>
  <div>
    <h3>ID PAGE: {{ $route.path }}</h3>

    <div>
      <FileTree />
    </div>
  </div>
</template>

<script>
import FileTree from '~/components/FileTree.vue'
export default {
  components: {
    FileTree
  }
}
</script>
