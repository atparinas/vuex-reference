<template>
    <div>
        <h1>Product List</h1>
        <div v-if="loading" >Loading....</div>
        <ul>
            <li v-for="product in products" :key="product.id">
                <span>{{ product.title }} </span> = <span>{{ product.price}}</span> | <span>{{product.inventory}}</span>
                <button @click="addProductToCart(product)" :disabled="!productIsInStock(product)" >Add to Cart</button>
            </li>
        </ul>
    </div>
</template>

<script>

    // import shop from '../api/shop';
    // import store from '@/store/index';

    export default {
        name: "ProductList",
        data(){
            return{
                loading: false
            }
        },
        methods: {
            addProductToCart(product){
                this.$store.dispatch('cart/addProductToCart', product);
            }
        },
        computed: {
            products(){
                // return store.state.products // For all products
                // return this.$store.getters.availableProducts
                return this.$store.getters['products/allProducts'];
            },
            productIsInStock(){
                return this.$store.getters['products/productIsInStock']
            }
        },
        created() {
            this.loading = true;
            this.$store.dispatch('products/fetchProducts').then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>