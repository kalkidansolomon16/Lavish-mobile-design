<script setup>
import { computed } from 'vue'
import { state, go, fmtDate, etb } from '../store'
import AppBar from '../components/AppBar.vue'

const list = computed(() => state.appointments.filter((a) => !['declined', 'cancelled'].includes(a.status)))
const due = computed(() => list.value.filter((a) => a.payment.status === 'unpaid').reduce((t, a) => t + a.payment.amount, 0))
const paid = computed(() => list.value.filter((a) => a.payment.status === 'paid').reduce((t, a) => t + a.payment.amount, 0))
</script>

<template>
  <div class="scr">
    <AppBar title="Payments" />
    <div class="body">
      <div class="row" style="gap: 12px">
        <div class="card grow" style="background: var(--dark); color: #fff; border: 0"><span class="label" style="color: var(--mint)">Outstanding</span><div class="serif" style="font-size: 26px">{{ etb(due) }}</div></div>
        <div class="card grow"><span class="label">Paid</span><div class="serif" style="font-size: 26px">{{ etb(paid) }}</div></div>
      </div>
      <div class="banner mt12"><span class="ms">info</span><span>Pay in the app or at reception. The receptionist confirms cash payments and they appear here.</span></div>

      <div class="sec"><h4>History</h4></div>
      <div class="list">
        <button v-for="a in list" :key="a.id" class="li" @click="a.payment.status === 'paid' ? go('appointment', { id: a.id }) : go('pay', { id: a.id })">
          <span class="ic sm" :class="{ gold: a.payment.status !== 'paid' }"><span class="ms">{{ a.payment.status === 'paid' ? 'receipt_long' : 'pending' }}</span></span>
          <span class="grow"><b class="ellip">{{ a.service }}</b><small>{{ fmtDate(a.date) }} · {{ a.payment.method ?? 'Not paid yet' }}</small></span>
          <span style="text-align: right"><b style="font-weight: 500">{{ etb(a.payment.amount) }}</b><span class="badge" :class="a.payment.status">{{ a.payment.status === 'paid' ? 'paid' : 'pay now' }}</span></span>
        </button>
      </div>
    </div>
  </div>
</template>
