<template>
  <nav class="flex justify-content-between">
    <ul class="flex align-items-center">
      <li>
        <router-link :to="{name: 'Home'}">
          <figure
              class="p-xs"
              style="width: 200px;"
          >
            <img
                alt="Geomiq-Logo"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAoCAYAAABEm8fXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATHSURBVHgB7d1vUttGGAbwd1fyTFsC448Okt29QeEEMSeAG2BOQDhB4AQ0JwBOUDgBzgninCAq2AkfmRDSTh17+67tNk4mBsmy433l5zdjMP4DyLt6pF1Ju4pYpVIxpVKwz3cbfCuTDAnfmt1u7+jm5iZJ+6Y4ji6VojotlD2/u/u0d8soB8nldnd3f5B1+ctsbe2XfWvVc5KzvE6z36eDTqfTSvuGWi06/vDh/mhGdeSE726QkM/MWmppbc+vrt4dffucGi3QJd83JFPClX8zbcH6EVjDQvn48X5r2gq5bOXmwmp1deU1yV1eLnO11W63m2le6+opfyvPoI64z0xSuI9rXl93tsYf0LxAL0hwJWCGt7rPSRgOzY0nT1Yu3YpIU1i2cltbW2mQ7OXlMrcvsr0+Xx0Jw8GeldSwcurV6tOd8Qc033ZION5y7ZJAOSuk+HLjZtL2PF7rsTpl5OqI27N0e0tZ3meMKfvQkshPf1XuLrAkJ7B4OUJLfLkppVIvA++dGFpeg+Z/ttD6uyjrtRn/QRMsXN5df1gKU4RW8YSTn7Ln3DH8hjyilP6N/69cTSEOhzNr7Svy0Orqz3XuXz2nfE55+f4kj/Ce1DOiuTVPmtOXp3LNpv0JT079OfLy/krDI7ezZkZ9l3uUA6/XL/lrrqOPs6a12ub/a+Ox100MrH5fXfBh2FPySBRFDa3z9d3wUYdTKjDuzztrtztN8kgcrx/ySlynOXBh1W6/O6QpGFMxvV6w//3fO/3nGMeVulJBgzxVKvWP375979VGjTvXDcfWo4GFJiEAiBGSIKVSr/n5c7j17eNh6NfuLQDMh6jASpLBGe0JAcBSQpMQAMRAYAGAGAgsABADgQUAYiyk091d59Trdf+gXNyRQXWR9byqajU6Jnr8BLV5Uso2vzd0BgA8bEFHCd11TkGdclHuyw4H0DMOrdRn/rqzaRd9Uai1ql6rrRNCCyCbIjQJG7XaU3HDy3BoHXJoZRpuBGDZFaIPy1otcugRhBZANkXpdDckFEILID0cJfQAQgsgnYVdmsOd303Kzg0HkvcI3xv+295xHfFxHL9KO+Y3wDJaSGCNrgncyvo+N7wMB9YJ5dBud8R10APAEJqEACAGAgsAxEBgAYAYCCwAEAOBBQBiILAAQAwEFgCIMfE8LK3tdhyvG/KIUsrNS0h5VKtRw9rFziKslG1dX7/PO//gpN+9y+VWJ4+M5iUET3S7+oDriFcTt7h1O80J3Q+cOKp2lMo3B+Ds5T9FnT+U3XnNkZeeolotalxddc5o9hq8fAQwyXDyWL/qSNqrT9AkXBAuoFMOrV0CgIdsRFH0/+V4LrDEz+nHTTyRy5AztIowF2NCMCc/FWWuzrLWdFmpVIz7QfNKM49myQ/FTaAWCTVtaBWj3PoXBHORJMntlAMM+KhcKgWD0NJh2Pudq39CYtkkCHqihxqeJrSKUG5a/3VKMDdhSAdUjD1xx3BonWg3ckIQ9N3ICW6LLWnh3BbkZRB82hyN/iBa1tCSXW7qaFhut0VZmbyUJJ0Wb8w3i7GnNdgx2cPhJADwxnBGrX9ec4eB+fKoHWyc3UYaRwkBwBuu723Ycvivu+NLWBEAgI+MqZg4ji7d9/HH/wXfG7zJXYjQHQAAAABJRU5ErkJggg=="
            >
          </figure>
        </router-link>
      </li>
    </ul>
    <ul class="flex justify-content-end align-items-center">
      <li v-if="loggedIn">
        <router-link
            :to="{name: 'Login'}"
            @click.native="logOut"
        >Logout
        </router-link>
      </li>
      <template v-else>
        <li class="m-r-md">
          <router-link :to="{name: 'Login'}">Login</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Register'}">Register</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import store, {setLoggedIn, setUser} from "@/util/store";
import Api, {ENDPOINTS} from "@/util/api";

export default {
  name: "NavBar",
  computed: {
    user: () => store.user,
    loggedIn: () => store.loggedIn
  },
  methods: {
    logOut() {
      Api.post(ENDPOINTS.LOGOUT);
      setUser(null);
      setLoggedIn(false);
      this.$router.push({name: "Login"});
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #efefef;
  left: 0;
  margin-bottom: 1rem;
  padding: 1rem;
  position: fixed;
  right: 0;
  top: 0;
}

li a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}
</style>
