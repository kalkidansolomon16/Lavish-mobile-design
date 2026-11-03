<script setup>
import { computed } from 'vue'
import { state, go, product, fmtDate, etb, ORDER_FLOW, orderStep } from '../store'
import AppBar from '../components/AppBar.vue'
import ProductArt from '../components/ProductArt.vue'
import Steps from '../components/Steps.vue'

const p = defineProps({ params: Object })
const o = state.orders.find((x) => x.id === p.params.id) ?? state.orders[0]
const at = computed(() => ORDER_FLOW.findIndex((s) => s.key === o.status))
const step = computed(() => orderStep(o))
const steps = computed(() => ORDER_FLOW.map((s, i) => ({
  t: s.t,
  d: o.history?.[s.key] ? `${o.history[s.key]} · ${s.key === 'out' && o.courier ? 'with ' + o.courier.name : s.d}` : s.d,
  done: i <= at.value, now: i === at.value + 1 && o.status !== 'delivered',
})))
const HEAD = {
  placed: 'We received your order and sent a receipt to your email.',
  confirmed: 'Your order is confirmed — we’ll start preparing it shortly.',
  preparing: 'Our team is carefully packing your products.',
  ready: 'Your order is packed and waiting for the courier.',
  out: 'Your order is on its way. Please keep your phone nearby.',
  delivered: 'Your order was delivered. Enjoy your products!',
}
</script>

<template>
  <div class="scr">
    <AppBar :title="'Order #' + o.id" :sub="'Tracking code LV-' + o.id" />
    <div class="body">
      <div class="status-head" :class="'st-' + o.status">
        <span class="ms">{{ step.icon }}</span>
        <div><b>{{ step.t }}</b><p>{{ HEAD[o.status] }}</p></div>
      </div>

      <div class="o-progress mt12"><i v-for="(s, i) in ORDER_FLOW" :key="s.key" :class="{ on: i <= at }"></i></div>

      <div v-if="o.status === 'out' && o.courier" class="card mt12 row">
        <span class="ic"><span class="ms">two_wheeler</span></span>
        <div class="grow"><b style="font-weight: 500">{{ o.courier.name }}</b><div class="muted small">Your Lavish courier{{ o.method === 'Pay on delivery' ? ' · have ' + etb(o.total) + ' ready' : '' }}</div></div>
        <a class="icon-btn" :href="'tel:' + o.courier.phone.replace(/ /g, '')"><span class="ms">call</span></a>
      </div>

      <div class="card mt12"><Steps :steps="steps" /></div>
      <div class="banner mt12"><span class="ms">mail</span><span>Every update is also emailed to <b>{{ state.client.email }}</b>.</span></div>

      <div class="sec" style="margin-top: 20px"><h4>Items</h4></div>
      <div class="card">
        <div v-for="l in o.lines" :key="l.productId" class="cart-line">
          <ProductArt :product="product(l.productId)" :h="56" style="width: 56px; border-radius: 12px; flex-shrink: 0" />
          <div class="grow"><b style="font-weight: 500; font-size: 13.5px">{{ product(l.productId).name }}</b><div class="muted small">Qty {{ l.qty }}</div></div>
          <span style="font-weight: 500">{{ etb(product(l.productId).price * l.qty) }}</span>
        </div>
        <div class="mt12">
          <div class="kv"><span>Ordered</span><span>{{ fmtDate(o.date, { day: 'numeric', month: 'long', year: 'numeric' }) }}</span></div>
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
