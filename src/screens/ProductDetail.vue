<script setup>
import { ref } from 'vue'
import { go, back, product, etb, cartCount, actions, notify } from '../store'
import ProductArt from '../components/ProductArt.vue'

const p = defineProps({ params: Object })
const pr = product(p.params.id ?? 1)
const qty = ref(1)
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div style="position: relative">
        <ProductArt :product="pr" :h="360" style="border-radius: 0 0 30px 30px" />
        <div class="row between" style="position: absolute; top: 52px; left: 14px; right: 14px">
          <button class="icon-btn boxed" @click="back"><span class="ms">arrow_back</span></button>
          <button class="icon-btn boxed" @click="go('cart')"><span class="ms">shopping_bag</span><i v-if="cartCount()" class="count">{{ cartCount() }}</i></button>
        </div>
      </div>
      <div class="pad mt20">
        <span class="label">{{ pr.category }} · {{ pr.size }}</span>
        <h2 style="font-size: 28px; line-height: 1.1; margin-top: 4px">{{ pr.name }}</h2>
        <div class="row between mt12">
          <span class="price" style="font-size: 26px">{{ etb(pr.price) }}</span>
          <span class="badge" :class="pr.stock === 0 ? 'declined' : pr.stock <= 5 ? 'pending' : 'available'">{{ pr.stock === 0 ? 'Out of stock' : pr.stock <= 5 ? `Only ${pr.stock} left` : 'In stock' }}</span>
        </div>
        <p class="mt16" style="line-height: 1.55; color: #4a4a4a">{{ pr.desc }}</p>
        <div class="card mt16 row top"><span class="ic sm"><span class="ms">tips_and_updates</span></span><div><b style="font-weight: 500">How to use</b><p class="small muted mt4" style="line-height: 1.5">{{ pr.use }}</p></div></div>
        <div class="card mt12 row top"><span class="ic sm gold"><span class="ms">local_shipping</span></span><div><b style="font-weight: 500">Delivery in Addis Ababa</b><p class="small muted mt4">1–2 days · ETB 150 · Pay on delivery available</p></div></div>
      </div>
    </div>
    <div class="foot">
      <template v-if="pr.stock">
        <div class="stepper"><button @click="qty = Math.max(1, qty - 1)"><span class="ms">remove</span></button><span>{{ qty }}</span><button @click="qty = Math.min(pr.stock, qty + 1)"><span class="ms">add</span></button></div>
        <button class="btn" @click="actions.addToCart(pr.id, qty)">Add to cart · {{ etb(pr.price * qty) }}</button>
      </template>
      <button v-else class="btn soft" @click="notify('We’ll notify you when it’s back in stock')"><span class="ms">notifications</span>Notify me when available</button>
    </div>
  </div>
</template>
