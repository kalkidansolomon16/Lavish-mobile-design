<script setup>
import { state, go, doctor, product, fmtDate, etb, actions } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import ProductArt from '../components/ProductArt.vue'

const p = defineProps({ params: Object })
const rx = state.prescriptions.find((x) => x.id === p.params.id) ?? state.prescriptions[0]
const d = doctor(rx.doctorId)
const total = rx.items.reduce((t, i) => t + product(i.productId).price * i.qty, 0)
function order() { actions.orderPrescription(rx); go('cart') }
</script>

<template>
  <div class="scr">
    <AppBar title="Prescription" :sub="fmtDate(rx.date, { day: 'numeric', month: 'long', year: 'numeric' })" />
    <div class="body">
      <div class="card">
        <div class="row"><Avatar :name="d.name" :hue="d.hue" :size="48" /><div class="grow"><b style="font-weight: 500">{{ d.name }}</b><div class="muted small">{{ d.specialty }}</div></div><button class="icon-btn boxed" @click="go('chat', { key: d.id })"><span class="ms">chat</span></button></div>
        <div class="banner gold mt12"><span class="ms">format_quote</span><span>{{ rx.note }}</span></div>
      </div>

      <div class="sec" style="margin-top: 20px"><h4>Products</h4></div>
      <div class="stack">
        <div v-for="i in rx.items" :key="i.productId" class="card" @click="go('product', { id: i.productId })">
          <div class="row top">
            <ProductArt :product="product(i.productId)" :h="64" style="width: 64px; border-radius: 14px; flex-shrink: 0" />
            <div class="grow"><b style="font-weight: 500; font-size: 14px">{{ product(i.productId).name }}</b><div class="muted small">Qty {{ i.qty }} · {{ etb(product(i.productId).price * i.qty) }}</div></div>
          </div>
          <div class="row top mt12 small" style="background: var(--bg); border-radius: 12px; padding: 10px 12px; gap: 8px"><span class="ms" style="font-size: 18px; color: var(--dark)">schedule</span><span>{{ i.instructions }}</span></div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="sum"><small>Total</small><b>{{ etb(total) }}</b></div>
      <button v-if="rx.status === 'sent'" class="btn" @click="order"><span class="ms">shopping_bag</span>Order all items</button>
      <button v-else class="btn soft" disabled><span class="ms">check</span>Already ordered</button>
    </div>
  </div>
</template>
