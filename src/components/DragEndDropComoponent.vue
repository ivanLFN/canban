<template>
  <div>
    <h1>Drag End Drop Comoponent</h1>
    <div>
      <p v-if="responseData">{{ responseData }}</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      responseData: null
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/store/cardItems');
      this.responseData = response.data;
    } catch (error) {
      this.responseData = [
        {
          id: '1',
          title: 'Blue T-Shirt',
          desc: 'Comfortable cotton t-shirt in a classic blue color.',
          category: 'Clothing',
          price: '$20.99',
          rating: 4.5,
          list: '1'
        },
        {
          id: '2',
          title: 'Black Jeans',
          desc: 'Slim-fit black jeans with a stretchy fabric for maximum comfort.',
          category: 'Clothing',
          price: '$29.99',
          rating: 4.2,
          list: '1'
        },
        {
          id: '3',
          title: 'Wireless Headphones',
          desc: 'High-quality wireless headphones with noise-canceling technology.',
          category: 'Electronics',
          price: '$99.99',
          rating: 4.8,
          list: '2'
        },
        {
          id: '4',
          title: 'Leather Wallet',
          desc: 'Genuine leather wallet with multiple card slots and a cash pocket.',
          category: 'Accessories',
          price: '$49.99',
          rating: 4.6,
          list: '2'
        },
        {
          id: '5',
          title: 'Running Shoes',
          desc: 'Lightweight running shoes with breathable mesh upper and cushioned sole.',
          category: 'Shoes',
          price: '$59.99',
          rating: 4.4,
          list: '3'
        }
      ]
    }
  }
}

</script>