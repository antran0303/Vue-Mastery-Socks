app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
            <div class="product-image">
                <img :class="{ 'out-of-stock-img': !inventory }" v-bind:src="image">
            </div>
            <div class="product-info">
                <h1> {{ title }}</h1>
                <p v-if="isStock">In Stock</p>
                <p v-else=>out of stock</p>
                <p>Shipping: {{shipping }}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="(variant, index) in variants" :key="variant.id" v-on:mouseover="updateVariant(index)"
                    class="color-circle" v-bind:style="{backgroundColor: variant.color}">

                </div>
                <div class="mt-5">
                    <button :disabled="!isStock" :class="{disableButton: !isStock}" type="button" class="btn btn-primary mr-5"
                        v-on:click="addToCart">Add to cart</button>
                    <button type="button" class="btn btn-primary" v-on:click="removeToCart">remove to cart</button>
                </div>
            </div>

            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"> </review-form>
        </div>`,


    data() {
        return {
            product: 'Socks',
            brand: 'Vue mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% '],
            variants: [
                { id: 1, color: 'Blue', image: './asstes/images/socks_blue.jpg', quantity: 50 },
                { id: 2, color: 'Red', image: './asstes/images/socks_red.jpg', quantity: 0 }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeToCart() {
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].id)

        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        isStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'free'
            }
            return 2.99
        }
    }
})
