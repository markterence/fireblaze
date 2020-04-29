<template>
  <div :class="[$style.container, $style.loginContainer, 'flex-column']">
    <div class="position-absolute" :class="$style.logo">
      <Logo class="w-50" />
    </div>
    <b-container>
      <b-row class="mb-2 justify-content-center">
        <b-col sm="8" md="6" lg="4">
          <b-alert
            :show="!!formError"
            style="height:20px"
            class="mb-0 px-0 align-items-center justify-content-center d-flex small"
            variant="danger"
          >
            {{ formError }}
          </b-alert>
        </b-col>
      </b-row>
      <b-form @submit.prevent="login">
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
              type="password"
              label="Secret Key"
            />
          </b-col>
        </b-row>
        <b-row class="mt-4 mb-2 justify-content-center">
          <b-col sm="8" md="6" lg="4">
            <b-button
              :class="[$style.loginBtn, 'shadow']"
              variant="dark"
              block
              type="submit"
            >
              Login
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import FloatingInput from '~/components/FloatingInput.vue'
export default {
  components: {
    FloatingInput,
    Logo
  },
  data() {
    return {
      accessKey: 'demo',
      secret: 'demo',
      formError: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.accessKey,
          password: this.secret
        })
        // this.accessKey = ''
        // this.secret = ''
        this.formError = null
        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style module>
.logo {
  top: 40px;
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
