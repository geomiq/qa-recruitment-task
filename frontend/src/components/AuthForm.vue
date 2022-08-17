<template>
  <section
      class="box"
  >
    <form @submit.prevent="submit">
      <header>
        <p style="font-size: 1.5rem; color: #888888;">
          <strong>{{ isRegistration ? 'Register' : 'Login' }}</strong>
        </p>
      </header>
      <hr>
      <section>
        <div class="m-b-md" v-if="isRegistration">
          <label for="name">
            Name
          </label>
          <br>
          <input v-model="form.name" required type="text" id="name">
        </div>
        <div class="m-b-md">
          <label for="email">
            Email
          </label>
          <br>
          <input
              id="email"
              v-model="form.email"
              required
              type="email"
          >
        </div>
        <div class="m-b-md">
          <label for="password">
            Password
          </label>
          <br>
          <input
              id="password"
              v-model="form.password"
              required
              type="password"
          >
        </div>
        <div class="m-b-md" v-if="isRegistration">
          <label for="confirmation">
            Confirmation
          </label>
          <br>
          <input v-model="form.password_confirmation" required type="password" id="confirmation">
        </div>
        <div class="m-b-md" v-if="! isRegistration">
          <label for="remember">
            Remember me
          </label>
          <br>
          <input v-model="form.remember" type="checkbox" id="remember">
        </div>
      </section>
      <hr>
      <footer class="flex justify-content-between align-items-center">
        <button>
          {{ isRegistration ? 'Sign up' : 'Login' }}
        </button>
        <router-link :to="{ name: isRegistration ? 'Login' : 'Register' }">
          {{ isRegistration ? 'Already have an account? Log in here!' : 'No account yet? Sign up here!' }}
        </router-link>
      </footer>
    </form>
  </section>
</template>

<script>
import Api, {ENDPOINTS} from "@/util/api";
import store, {setLoggedIn, setUser} from "@/util/store";

export default {
  name: "AuthForm",
  props: {
    isRegistration: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        remember: null
      },
      responseMessage: null
    }
  },
  computed: {
    loggedIn: () => store.loggedIn
  },
  methods: {
    submit() {
      if (this.isRegistration) {
        this.register()
      } else {
        this.login()
      }
    },
    async register() {
      const { data, status } = await Api.post(ENDPOINTS.REGISTER, this.form).catch(e => e.response);
      if (status < 300) {
        setLoggedIn(true);
        setUser(data);
        this.$router.push({name: "Home"});
      } else {
        alert("Registration unsuccessful.");
      }
    },
    async login() {
      const {status: CSRFStatus} = await Api.get(ENDPOINTS.CSRF).catch(e => e.response)
      if (CSRFStatus < 300) {
        const { data, status } = await Api.post(ENDPOINTS.LOGIN, this.form).catch(e => e.response);
        if (status < 300) {
          setLoggedIn(true);
          if (this.loggedIn) {
            setUser(data);
            this.$router.push({name: "Home"});
          }
          await Api.get(ENDPOINTS.USER)
        } else {
          alert("Login unsuccessful!")
        }
      }
    }
  }
}
</script>

<style scoped>
section.box {
  margin: auto;
  max-width: 600px;
  width: 100%;
}
</style>
