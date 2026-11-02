<script setup>
import { state, go, product, fmtDate, etb } from '../store'
import AppBar from '../components/AppBar.vue'
import ProductArt from '../components/ProductArt.vue'
import Steps from '../components/Steps.vue'

const p = defineProps({ params: Object })
const o = state.orders.find((x) => x.id === p.params.id) ?? state.orders[0]
const delivered = o.status === 'delivered'
const steps = [
  { t: 'Order placed', d: fmtDate(o.date), done: true },
  { t: 'Confirmed by Lavish', d: 'Our team prepares your products', done: delivered, now: !delivered },
  { t: 'Delivered', d: delivered ? 'Admin confirmed delivery' : 'Usually within 1–2 days', done: delivered },
]
</script>

<template>
  <div class="scr">
    <AppBar :title="'Order #' + o.id" :sub="fmtDate(o.date, { day: 'numeric', month: 'long', year: 'numeric' })" />
    <div class="body">
      <div class="status-head" :class="'st-' + o.status">
        <span class="ms">{{ delivered ? 'inventory' : 'local_shipping' }}</span>
        <div><b>{{ delivered ? 'Delivered' : 'On its way' }}</b><p>{{ delivered ? 'Your order was delivered. Enjoy your products!' : 'We’ll notify you when the courier is close.' }}</p></div>
      </div>
      <div class="card mt12"><Steps :steps="steps" /></div>

      <div class="sec" style="margin-top: 20px"><h4>Items</h4></div>
      <div class="card">
        <div v-for="l in o.lines" :key="l.productId" class="cart-line">
          <ProductArt :product="product(l.productId)" :h="56" style="width: 56px; border-radius: 12px; flex-shrink: 0" />
          <div class="grow"><b style="font-weight: 500; font-size: 13.5px">{{ product(l.productId).name }}</b><div class="muted small">Qty {{ l.qty }}</div></div>
          <span style="font-weight: 500">{{ etb(product(l.productId).price * l.qty) }}</span>
        </div>
        <div class="mt12">
          <div class="kv"><span>Delivery</span><span>{{ etb(o.fee) }}</span></div>
          <div class="kv"><span>Payment</span><span>{{ o.method }}</span></div>
          <div class="kv total"><span>Total</span><span>{{ etb(o.total) }}</span></div>
        </div>
      </div>
      <div class="card mt12 row top"><span class="ic sm"><span class="ms">location_on</span></span><div><b style="font-weight: 500">Delivery address</b><p class="small muted mt4">{{ o.address }}</p></div></div>
      <button class="btn ghost mt16" @click="go('new-complaint', { category: 'Order', ref: 'Order #' + o.id })"><span class="ms">flag</span>Report a problem with this order</button>
    </div>
  </div>
</template>
