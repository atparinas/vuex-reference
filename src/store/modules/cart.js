import shop from "@/api/shop";

export default  {
    namespaced: true,
    state: {
        cart: [],
        checkoutStatus: null
    },


    getters: {
        cartProducts(state, getters, rootState){
            return state.cart.map(cartItem => {
                const product = rootState.products.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters){
            let total = 0;
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity;
            })
            return total;
            //Above Code can be converted to using Reduce
            // return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        }

    },

    mutations: {

        pushProductToCart(state, productId){
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem){
            cartItem.quantity++;

        },

        setCheckoutStatus(state, status){
            state.checkoutStatus = status;
        },
        emptyCart(state){
            state.cart = [];
        }

    },

    actions: {

        // to Access the state outside of the modules. use rootState as part of the context
        // if namespaced is set to true, the getters from the other modules will be accessible through
        // rootGetters as part of the context
        addProductToCart({state, commit, rootGetters}, product){

            // if(product.inventory > 0){
            // if(getters.productIsInStock(product)){
            if(rootGetters['products/productIsInStock'](product)){
                const cartItem = state.cart.find(item => item.id === product.id)
                if(!cartItem){
                    commit('pushProductToCart', product.id);
                }else {
                    commit('incrementItemQuantity', cartItem);
                }

                // Need to pass the root:true to be able to tell that it needs to access the root
                commit('products/decrementProductInventory', product, {root:true});
            }
        },

        checkout(context){
            shop.buyProducts(context.state.cart, () => {
                context.commit('emptyCart')
                context.commit('setCheckoutStatus', 'success');
            }, () => {
                context.commit('setCheckoutStatus', 'fail')
            })
        }

    }
}