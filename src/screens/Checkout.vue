<script setup>
import { reactive, computed } from 'vue'
import { state, go, etb, linesTotal, DELIVERY_FEE, actions, SUCCESS, notify } from '../store'
import AppBar from '../components/AppBar.vue'

const f = reactive({ address: 'Bole, around Edna Mall, Addis Ababa', phone: state.client.phone, note: '', method: 'Pay on delivery' })
const METHODS = [
  { k: 'Pay on delivery', icon: 'local_shipping', d: 'Cash or mobile money to the courier' },
  { k: 'Telebirr', icon: 'phone_iphone', d: 'Pay now from your wallet' },
  { k: 'Card (Chapa)', icon: 'credit_card', d: 'Visa or Mastercard' },
]
const total = computed(() => linesTotal(state.cart) + DELIVERY_FEE)
function place() {
  if (!state.cart.length) return notify('Your cart is empty')
  const o = actions.placeOrder(f)
  state.stack = [{ name: 'shop', params: {} }]
  go('success', SUCCESS.order(o))
}
</script>

<template>
  <div class="scr">
    <AppBar title="Checkout" />
    <div class="body">
      <div class="sec" style="margin-top: 4px"><h4>Delivery address</h4></div>
      <div class="card">
        <div class="row top"><span class="ic sm"><span class="ms">location_on</span></span><textarea v-model="f.address" class="ta" style="min-height: 52px; border: 0; padding: 6px 0"></textarea></div>
        <div class="field mt8" style="margin-bottom: 0"><label>Phone for the courier</label><div class="input"><span class="ms">call</span><input v-model="f.phone" /></div></div>
      </div>
      <div class="field mt12"><label>Delivery note (optional)</label><div class="input"><span class="ms">edit_note</span><input v-model="f.note" placeholder="Gate colour, landmark…" /></div></div>

      <div class="sec" style="margin-top: 12px"><h4>Payment</h4></div>
      <div class="stack" style="gap: 8px">
        <button v-for="x in METHODS" :key="x.k" class="radio-card" :class="{ on: f.method === x.k }" @click="f.method = x.k">
          <span class="r"></span><span class="ic"><span class="ms">{{ x.icon }}</span></span><span class="grow"><b>{{ x.k }}</b><small>{{ x.d }}</small></span>
        </button>
      </div>

      <div class="card mt16">
        <div class="kv"><span>Items ({{ state.cart.reduce((n, l) => n + l.qty, 0) }})</span><span>{{ etb(linesTotal(state.cart)) }}</span></div>
        <div class="kv"><span>Delivery</span><span>{{ etb(DELIVERY_FEE) }}</span></div>
        <div class="kv total"><span>Total</span><span>{{ etb(total) }}</span></div>
      </div>
      <p class="small muted mt12 center">Lavish confirms your order and delivers within 1–2 days.</p>
    </div>
    <div class="foot"><button class="btn" @click="place">Place order · {{ etb(total) }}</button></div>
  </div>
</template>
