<script setup>
import { ref, computed } from 'vue'
import { state, go, etb, cartCount, actions } from '../store'
import AppBar from '../components/AppBar.vue'
import ProductArt from '../components/ProductArt.vue'

const cat = ref('All')
const q = ref('')
const cats = ['All', ...new Set(state.products.map((p) => p.category))]
const list = computed(() => state.products.filter((p) => (cat.value === 'All' || p.category === cat.value) && p.name.toLowerCase().includes(q.value.toLowerCase())))
</script>

<template>
  <div class="scr">
    <AppBar title="Shop" root>
      <button class="icon-btn" @click="go('orders')"><span class="ms">receipt_long</span></button>
      <button class="icon-btn" @click="go('cart')"><span class="ms">shopping_bag</span><i v-if="cartCount()" class="count">{{ cartCount() }}</i></button>
    </AppBar>
    <div class="body">
      <label class="search"><span class="ms">search</span><input v-model="q" placeholder="Search products" /></label>

      <div class="promo teal-head mt12" style="padding: 18px">
        <div class="grow"><h4>Aftercare, doctor-approved</h4><p>The same products our doctors use in clinic — delivered to your door.</p></div>
        <span class="ms" style="font-size: 44px; color: var(--gold)">local_shipping</span>
      </div>

      <div class="chips mt16"><button v-for="c in cats" :key="c" class="chip" :class="{ on: cat === c }" @click="cat = c">{{ c }}</button></div>

      <div class="pgrid mt16">
        <div v-for="p in list" :key="p.id" class="pcard" @click="go('product', { id: p.id })">
          <ProductArt :product="p" />
          <div class="info">
            <small>{{ p.category }} · {{ p.size }}</small>
            <b>{{ p.name }}</b>
            <div class="row between mt8"><span class="price" style="font-size: 16px">{{ etb(p.price) }}</span><button class="add" :disabled="!p.stock" @click.stop="actions.addToCart(p.id)"><span class="ms">add</span></button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
