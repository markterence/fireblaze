<template>
  <div :class="[$style.container, $style.loginContainer]">
    <b-container>
      <b-row class="mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <b-input
            id="username"
            type="text"
            :class="[$style.floating, 'py-4']"
            placeholder=""
          ></b-input>
          <label :class="[$style.floatingLabel, 'text-muted']" for="username"
            >Access Key</label
          >
        </b-col>
      </b-row>
      <b-row class="mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <div class="d-flex flex-column-reverse ">
            <b-input
              id="password"
              type="password"
              :class="[$style.floating, 'py-4']"
              placeholder=""
            ></b-input>
            <label :class="[$style.floatingLabel, 'text-muted']" for="password"
              >Secret Key</label
            >
          </div>
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
export default {}
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
