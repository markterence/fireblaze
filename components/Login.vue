<template>
  <div :class="[$style.container, $style.loginContainer]">
    <b-container>
      <b-row class="mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <FloatingInput
            id="username"
            v-model="accessKey"
            autocomplete="off"
            type="text"
            label="Access Key"
          />
        </b-col>
      </b-row>
      <b-row class="mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <FloatingInput
            id="password"
            v-model="secret"
            autocomplete="off"
            type="text"
            label="Secret Key"
          />
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <b-button :class="[$style.loginBtn]" variant="dark" block>
            Login
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FloatingInput from '~/components/FloatingInput.vue'
export default {
  components: {
    FloatingInput
  },
  data() {
    return {
      accessKey: null,
      secret: null
    }
  }
}
</script>

<style module>
.floatingLabel {
  font-style: italic;
}

.floating,
.floatingLabel {
  transition: all 0.2s;
  touch-action: manipulation;
}
.floating::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}
.floating::input-placeholder {
  opacity: 0;
  transition: inherit;
}
.floating:not(:placeholder-shown) + .floatingLabel,
.floating:focus + .floatingLabel {
  transform: translate(0.12rem, -0.2rem) scale(0.79);
  top: 0;
  position: absolute;
}
.floating:not(:placeholder-shown) + .floatingLabel {
  color: #364fc7 !important;
  font-weight: 800;
  font-style: normal;
}
.floating:placeholder-shown + .floatingLabel {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0.8rem, 0.899rem) scale(1.2);
  top: 0;
  position: absolute;
}
.container {
  min-height: 100vh;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: start;
}
.loginContainer {
  background-color: #4c6ef5;
}

.loginBtn {
}
</style>
