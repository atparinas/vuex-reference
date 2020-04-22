import shop from "@/api/shop";


export default {
    namespaced: true,
    state: {
        products: []
    },

    getters: {

        allProducts(state){
            return state.products
        },
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0);
        },
        productIsInStock(){
            return (product) => {
                return product.inventory > 0;
            }
        }

    },

    mutations: {
        setProducts(state, products){
            state.products = products;
        },
        decrementProductInventory (state, product){
            product.inventory--;
        },
    },

    actions: {
        fetchProducts({commit}){  // Context can be destructure with {commit}
            return new Promise((resolve) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve("success")
                })
            })
        },
    }
}