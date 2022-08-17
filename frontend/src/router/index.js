import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import store, {setLoggedIn, setUser} from "@/util/store";
import Api, {ENDPOINTS} from "@/util/api";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isAuthPath: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      isAuthPath: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((async (to, from, next) => {
  if (to.meta && to.meta.requiresAuth && !store.loggedIn) {
    const {data, status} = await Api.get(ENDPOINTS.USER).catch(e => e.response);
    if (status < 300 && data) {
      setUser(data);
      setLoggedIn(true);
      next();
    } else {
      if (router.currentRoute.name !== "Login") {
        await router.push({name: "Login"});
      }
    }
  } else if (to.meta && to.meta.isAuthPath && store.loggedIn) {
    await router.push({name: "Home"});
  } else {
    next();
  }
}))

export default router
