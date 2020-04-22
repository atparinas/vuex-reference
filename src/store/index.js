import Vue from "vue";
import Vuex from "vuex";

import cart from './modules/cart';
import products from "./modules/products";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  state: {  //Similar to Data

  },
  getters: { //Similar to Computed. When we need to filtter or calculate at runtime

  },
  mutations: { // Use Only for mutating the State.


  },
  actions: { // Similar to Methods. Never mutate the state directly in the actions


  },
});
