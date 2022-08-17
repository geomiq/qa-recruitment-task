<template>
  <section class="box flex justify-content-center align-items-center">
    <h1
        v-if="showGreeting"
        style="text-align: center;"
    >
      {{ greeting }}
    </h1>
    <button
        v-else
        @click="showGreeting = true"
    >Show greeting
    </button>
  </section>
</template>

<script>
import store from "@/util/store";

export default {
  name: "WelcomeComponent",
  computed: {
    user: () => store.user,
    greeting() {
      const hrs = new Date().getHours();
      if (hrs < 12)
        return `Good Morning ${this.user.name}!`;
      else if (hrs >= 12 && hrs <= 17)
        return `Good Afternoon ${this.user.name}!`;
      else if (hrs >= 17 && hrs <= 24)
        return `Good Evening ${this.user.name}!`;
      return `Good day ${this.user.name}!`
    }
  },
  data() {
    return {
      showGreeting: false
    }
  }
}
</script>

<style scoped>

</style>
