<template>
  <section class="container">
    <WelcomeComponent />
  </section>
</template>

<script>
// @ is an alias to /src

import WelcomeComponent from "@/components/WelcomeComponent";
export default {
  name: 'Home',
  components: {
    WelcomeComponent
  }
}
</script>
