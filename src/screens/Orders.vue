<script setup>
import { state, go, product, fmtDate, etb } from '../store'
import AppBar from '../components/AppBar.vue'
import ProductArt from '../components/ProductArt.vue'
</script>

<template>
  <div class="scr">
    <AppBar title="My orders" />
    <div class="body">
      <div class="stack">
        <button v-for="o in state.orders" :key="o.id" class="card" style="text-align: left" @click="go('order', { id: o.id })">
          <div class="row between"><b style="font-weight: 500">Order #{{ o.id }}</b><span class="badge" :class="o.status">{{ o.status === 'placed' ? 'On the way' : o.status }}</span></div>
          <div class="row mt12" style="gap: 6px">
            <ProductArt v-for="l in o.lines" :key="l.productId" :product="product(l.productId)" :h="52" style="width: 52px; border-radius: 12px" />
          </div>
          <div class="row between mt12"><span class="muted small">{{ fmtDate(o.date) }} · {{ o.lines.reduce((n, l) => n + l.qty, 0) }} items</span><span class="price" style="font-size: 16px">{{ etb(o.total) }}</span></div>
        </button>
      </div>
      <div v-if="!state.orders.length" class="empty"><span class="ms">receipt_long</span><h4>No orders yet</h4></div>
    </div>
  </div>
</template>
