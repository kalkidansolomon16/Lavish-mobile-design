<script setup>
import { ref } from 'vue'
import { state, go, back, etb, fmtDate, notify, actions, SUCCESS } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const a = state.appointments.find((x) => x.id === p.params.id) ?? state.appointments[0]
// Online sessions never come to the desk, so there's no cash option for them.
const METHODS = [
  { k: 'Telebirr', icon: 'phone_iphone', d: 'Pay from your Telebirr wallet' },
  { k: 'CBE Birr', icon: 'account_balance', d: 'Commercial Bank of Ethiopia' },
  { k: 'Card (Chapa)', icon: 'credit_card', d: 'Visa or Mastercard via Chapa' },
  { k: 'Cash at reception', icon: 'storefront', d: 'Pay on the day — reception records it' },
].filter((x) => !a.online || !x.k.startsWith('Cash'))
const m = ref('Telebirr')

function pay() {
  if (m.value === 'Cash at reception') { notify('Reception will collect payment on your visit'); return back() }
  actions.pay(a, m.value)
  state.stack = [{ name: 'home', params: {} }]
  go('success', SUCCESS.payment(a))
}
</script>

<template>
  <div class="scr">
    <AppBar title="Payment" sub="Secured by Chapa" />
    <div class="body">
      <div class="card center" style="background: var(--dark); color: #fff; border: 0">
        <span class="label" style="color: var(--mint)">Amount due</span>
        <div class="serif" style="font-size: 40px; line-height: 1.1; margin-top: 4px">{{ etb(a.payment.amount) }}</div>
        <p class="small" style="color: var(--mint); margin-top: 4px">{{ a.online ? 'Online session · 45 min' : a.service }} · {{ fmtDate(a.date) }}</p>
      </div>

      <div class="sec" style="margin-top: 22px"><h4>Pay with</h4></div>
      <div class="stack" style="gap: 8px">
        <button v-for="x in METHODS" :key="x.k" class="radio-card" :class="{ on: m === x.k }" @click="m = x.k">
          <span class="r"></span><span class="ic" :class="{ gold: x.k.startsWith('Cash') }"><span class="ms">{{ x.icon }}</span></span>
          <span class="grow"><b>{{ x.k }}</b><small>{{ x.d }}</small></span>
        </button>
      </div>

      <div v-if="m === 'Telebirr' || m === 'CBE Birr'" class="field mt16"><label>Wallet phone number</label><div class="input"><span class="pre">+251</span><input value="911 22 33 44" /></div></div>
      <div class="banner grey mt12"><span class="ms">lock</span><span>You'll confirm the payment in your {{ m.startsWith('Card') ? 'bank' : 'wallet' }} app. Reception can see all payments made here.</span></div>
    </div>
    <div class="foot">
      <button class="btn" @click="pay">{{ m === 'Cash at reception' ? 'I’ll pay at reception' : 'Pay ' + etb(a.payment.amount) }}</button>
    </div>
  </div>
</template>
