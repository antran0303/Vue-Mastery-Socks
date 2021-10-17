const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: false
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)

        },
        removeCart(id) {
            this.cart.pop(id)
        }

    }
})

