<script setup>
import { computed } from 'vue'
import { state, go, reset, product, etb, linesTotal, DELIVERY_FEE, actions } from '../store'
import AppBar from '../components/AppBar.vue'
import ProductArt from '../components/ProductArt.vue'

const sub = computed(() => linesTotal(state.cart))
</script>

<template>
  <div class="scr">
    <AppBar title="Your cart" :sub="state.cart.length ? state.cart.length + ' products' : ''" />
    <div class="body">
      <template v-if="state.cart.length">
        <div class="card">
          <div v-for="l in state.cart" :key="l.productId" class="cart-line">
            <ProductArt :product="product(l.productId)" :h="68" style="width: 68px; border-radius: 14px; flex-shrink: 0" />
            <div class="grow"><b style="font-weight: 500; font-size: 13.5px; display: block; line-height: 1.3">{{ product(l.productId).name }}</b><span class="price" style="font-size: 15px">{{ etb(product(l.productId).price) }}</span></div>
            <div class="stepper"><button @click="actions.setQty(l, l.qty - 1)"><span class="ms">{{ l.qty === 1 ? 'delete' : 'remove' }}</span></button><span>{{ l.qty }}</span><button @click="actions.setQty(l, l.qty + 1)"><span class="ms">add</span></button></div>
          </div>
        </div>
        <div class="card mt12">
          <div class="kv"><span>Subtotal</span><span>{{ etb(sub) }}</span></div>
          <div class="kv"><span>Delivery</span><span>{{ etb(DELIVERY_FEE) }}</span></div>
          <div class="kv total"><span>Total</span><span>{{ etb(sub + DELIVERY_FEE) }}</span></div>
        </div>
        <a class="link center mt16" style="display: block" @click="reset('shop')">+ Add more products</a>
      </template>
      <div v-else class="empty"><span class="ms">shopping_bag</span><h4>Your cart is empty</h4><p>Browse doctor-approved skincare and aftercare.</p><button class="btn auto" @click="reset('shop')">Browse products</button></div>
    </div>
    <div v-if="state.cart.length" class="foot"><div class="sum"><small>Total</small><b>{{ etb(sub + DELIVERY_FEE) }}</b></div><button class="btn" @click="go('checkout')">Checkout</button></div>
  </div>
</template>
