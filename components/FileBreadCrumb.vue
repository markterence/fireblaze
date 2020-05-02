<template>
  <b-button-group class="shadow">
    <b-button
      v-for="(pathNode, i) in pathNodes"
      :key="'node-' + i"
      size="sm"
      class="border-left border-secondary"
      variant="dark"
      @click="navigate(pathNodes, i)"
      >{{ pathNode }}
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  props: {
    folder: {
      type: String,
      default() {
        return null
      }
    }
  },
  computed: {
    pathNodes() {
      // replace win path with unix
      if (this.folder) {
        console.log(this.folder)
        const p = this.folder.replace(/\\/g, '/')
        console.log(p)
        console.log(p.split('/'))
        return p.split('/')
      }
      return null
    }
  },
  methods: {
    buildPathFromNodes(pnod, nodeIndex) {
      console.log(`nood + ${nodeIndex}`, pnod)
      const nn = [...pnod]
      // const extraNodesCount = nodeIndex + (nn.length - 1)
      nn.splice(nodeIndex + 1, nn.length - 1)
      return nn.join('/')
    },
    navigate(pnod, nodeIndex) {
      this.$emit('node-click', {
        path: this.buildPathFromNodes(pnod, nodeIndex)
      })
    }
  }
}
</script>
