<template>
  <main id="app" class="flex">
    <NavBar />
    <section class="flex justify-content-center align-items-center container flex-grow-1">
      <router-view />
    </section>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {NavBar}
}
</script>
