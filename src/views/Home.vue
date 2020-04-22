<template>
  <div class="home">
      <ProductList />
      <hr>
      <ShoppingCart />
  </div>
</template>

<script>
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";

export default {
  name: "Home",
  components: {ProductList, ShoppingCart}
};
</script>
