<script setup>
import { ref } from 'vue'
import { state, go, doctor, service, etb, fmtDate, day, actions, SUCCESS } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const f = { doctorId: 1, service: 'Morpheus8 & Microneedling', date: day(3), time: '10:30', branch: 'Addis Ababa – Bole', note: '', ...p.params }
const d = f.doctorId ? doctor(f.doctorId) : null
const s = service(f.service)
const pay = ref('later')

function send() {
  const a = actions.book(f)
  state.stack = [{ name: 'home', params: {} }]
  if (pay.value === 'now') go('pay', { id: a.id })
  else go('success', SUCCESS.booking(a))
}
</script>

<template>
  <div class="scr">
    <AppBar title="Review & confirm" sub="Step 2 of 2" />
    <div class="body">
      <div class="card">
        <div class="row">
          <Avatar v-if="d" :name="d.name" :hue="d.hue" :size="48" />
          <span v-else class="ic gold" style="width: 48px; height: 48px"><span class="ms">auto_awesome</span></span>
          <div class="grow"><b style="font-weight: 500; font-size: 15px">{{ d ? d.name : 'Best available doctor' }}</b><div class="muted small">{{ d ? d.specialty : 'Assigned by reception' }}</div></div>
        </div>
        <div class="mt12">
          <div class="kv"><span>Treatment</span><span>{{ s.name }}</span></div>
          <div class="kv"><span>Date</span><span>{{ fmtDate(f.date, { weekday: 'long', day: 'numeric', month: 'long' }) }}</span></div>
          <div class="kv"><span>Time</span><span>{{ f.time }} · {{ s.mins }} min</span></div>
          <div class="kv"><span>Branch</span><span>{{ f.branch }}</span></div>
          <div v-if="f.note" class="kv"><span>Note</span><span>{{ f.note }}</span></div>
          <div class="kv total"><span>Total</span><span>{{ etb(s.price) }}</span></div>
        </div>
      </div>

      <div class="sec" style="margin-top: 20px"><h4>Payment</h4></div>
      <div class="stack" style="gap: 8px">
        <button class="radio-card" :class="{ on: pay === 'later' }" @click="pay = 'later'">
          <span class="r"></span><span class="ic"><span class="ms">storefront</span></span>
          <span class="grow"><b>Pay at reception</b><small>Pay on the day — cash or mobile money</small></span>
        </button>
        <button class="radio-card" :class="{ on: pay === 'now' }" @click="pay = 'now'">
          <span class="r"></span><span class="ic gold"><span class="ms">phone_iphone</span></span>
          <span class="grow"><b>Pay now</b><small>Telebirr, CBE Birr or card via Chapa</small></span>
        </button>
      </div>

      <div class="banner mt16"><span class="ms">info</span><span>Your request goes to <b>reception</b> first. Once they approve it, your doctor is notified and you get a confirmation.</span></div>
      <p class="small muted mt12 center">Free cancellation up to 24 hours before your appointment.</p>
    </div>
    <div class="foot"><button class="btn" @click="send"><span class="ms">send</span>Send booking request</button></div>
  </div>
</template>
