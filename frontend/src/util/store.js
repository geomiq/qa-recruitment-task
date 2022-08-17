import Vue from 'vue';

const store = Vue.observable({
  user: null,
  loggedIn: false
});
export const setUser = (user) => store.user = user;
export const setLoggedIn = (loggedIn) => store.loggedIn = loggedIn;
export default store;
