<template>
  <div>
    <div class="d-flex" style="height: 50px;">
      <b-form-checkbox-group v-if="false" v-model="selectedFields" class="mt-1">
        <b-form-checkbox
          v-for="field in fields"
          :key="field.key || field"
          :value="field.key || field"
          >{{ field.label || field }}</b-form-checkbox
        >
      </b-form-checkbox-group>
      <div class="ml-auto">
        <b-button
          v-show="selectedFiles.length > 0"
          size="sm"
          variant="dark"
          @click="burn"
          >Send ashes (zip) to firebase storage 🔥</b-button
        >
      </div>
    </div>
    <p v-if="formError" class="text-danger">{{ formError }}</p>
    <div
      class="bg-dark text-light col-lg-8 p-0 mb-2 align-items-center border rounded p-3"
    >
      <span>true sight mode</span>
      <div class="mt-2 d-flex">
        <span class="mr-2">Folder: </span>
        <b-input v-model="folder" type="text" size="sm"></b-input>
        <b-button class="mx-2" size="sm" @click="listDir(folder)">Go</b-button>
      </div>
    </div>
    <div v-if="false" class="d-flex col-lg-4 p-0 mb-2 align-items-center">
      <span class="mr-3">Filter: </span>
      <b-input v-model="searchKeyword" type="text" size="sm"></b-input>
    </div>

    <b-table
      ref="ftable"
      small
      bordered
      selectable
      :fields="filterFields"
      :filter="searchKeyword"
      responsive
      :items="list"
      class="w-100"
      @row-selected="rowSelected"
    >
      <template v-slot:[expander]="data">
        <div class="d-flex flex-row">
          <b-form-checkbox
            v-if="data.item.name !== '..'"
            class="mr-2"
            :checked="data.rowSelected"
          ></b-form-checkbox>
          <div v-if="data.item.isDir">
            <span
              class="btn p-0 pr-3 btn-link"
              @click="listDir(data.item.path)"
              >{{ data.value }}</span
            >
          </div>
          <div v-else>
            <span> {{ data.value }} </span>
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import axios from 'axios'
import _ from 'lodash'
export default {
  data() {
    return {
      formError: null,
      searchKeyword: '',
      selectedFields: [],
      fields: [
        {
          label: 'Name',
          key: 'name',
          expand: true
        }
      ],
      list: [],
      folder: null,
      selectedFiles: []
    }
  },
  computed: {
    isChildren(row) {
      return row.children && row.children.length > 0
    },
    expander() {
      let fieldKey = this.fields.find((f) => f.expand).key
      fieldKey = fieldKey || this.fields[0].key || this.fields[0]
      return `cell(${fieldKey})`
    },
    filterFields() {
      const fields = this.fields.filter((f) =>
        this.selectedFields.includes(f.key || f)
      )
      return fields.length > 0 ? fields : this.fields
    }
  },
  methods: {
    async burn() {
      this.formError = null

      try {
        const res = await axios.post('/api/fireblaze-start', {
          volume: this.folder,
          selectedFiles: _.flatMap(this.selectedFiles, (f) => f.path)
        })
        console.log(res.data.stats.size)
        this.$bvToast.toast(res.data.stats.size, {
          title: 'Fireblaze',
          variant: 'success',
          toaster: 'b-toaster-bottom-right'
        })
      } catch (error) {
        this.formError = error.message
        if (error.response.status === 401) {
          this.$bvToast.toast('Session broke', {
            title: 'Fireblaze',
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
          })
        }
      }
    },
    rowSelected(items) {
      if (this.$refs.ftable.isRowSelected(0)) {
        this.$refs.ftable.unselectRow(0)
      }
      this.selectedFiles = items
    },
    async listDir(folder) {
      this.formError = null

      try {
        const res = await axios.post('/api/browse', {
          folder
        })

        this.list = res.data
      } catch (error) {
        this.formError = error.message
        if (error.response.status === 401) {
          this.$bvToast.toast('Session broke', {
            title: 'Fireblaze',
            variant: 'danger',
            toaster: 'b-toaster-bottom-right'
          })
        }
      }
    }
  }
}
</script>
<style module></style>
