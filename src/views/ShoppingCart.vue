<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.title">
                <span>{{product.title}}</span> | <span>{{product.price}}</span> | <span>{{product.quantity}}</span>
            </li>
        </ul>
        <h3>Total: {{ total }}</h3>
        <button @click="$store.dispatch('cart/checkout')" >Checkout</button>
        <p v-if="$store.state.cart.checkoutStatus">{{ $store.state.cart.checkoutStatus }}</p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "ShoppingCart",
        computed: {
            // products(){
            //     return this.$store.getters['cart/cartProducts'] // When namespaced is enabled
            // },
            // total(){
            //     return this.$store.getters['cart/cartTotal']
            // }
            ...mapGetters('cart', //Name of the module when namespaced is enabled
                {
                    products: 'cartProducts',
                    total: 'cartTotal'
                })
        }
    }
</script>

<style scoped>

</style>