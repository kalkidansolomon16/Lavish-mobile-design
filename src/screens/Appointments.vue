<script setup>
import { ref, computed } from 'vue'
import { state, go, doctor, service, fmtDate, etb } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const tab = ref(p.params.tab || 'upcoming')
const TABS = { upcoming: ['approved'], requests: ['pending'], past: ['completed', 'declined', 'cancelled'] }
const list = computed(() => state.appointments.filter((a) => TABS[tab.value].includes(a.status)))
const count = (t) => state.appointments.filter((a) => TABS[t].includes(a.status)).length
</script>

<template>
  <div class="scr">
    <AppBar title="My appointments" />
    <div class="body">
      <div class="seg">
        <button v-for="t in ['upcoming', 'requests', 'past']" :key="t" :class="{ on: tab === t }" style="text-transform: capitalize" @click="tab = t">{{ t }} <span class="muted small">{{ count(t) }}</span></button>
      </div>

      <div class="stack mt16">
        <button v-for="a in list" :key="a.id" class="card" style="text-align: left" @click="go('appointment', { id: a.id })">
          <div class="row top">
            <span class="ic"><span class="ms">{{ service(a.service).icon }}</span></span>
            <div class="grow">
              <div class="row between top"><b style="font-weight: 500; font-size: 15px">{{ a.service }}</b><span class="badge" :class="a.status">{{ a.status }}</span></div>
              <div class="muted small mt4">{{ a.doctorId ? doctor(a.doctorId).name : 'Doctor to be assigned' }}</div>
              <div class="meta mt8">
                <span><span class="ms">calendar_today</span>{{ fmtDate(a.date) }}</span>
                <span><span class="ms">schedule</span>{{ a.time }}</span>
                <span><span class="ms">payments</span>{{ a.payment.status === 'paid' ? 'Paid' : etb(a.payment.amount) }}</span>
              </div>
            </div>
          </div>
        </button>
        <div v-if="!list.length" class="empty">
          <span class="ms">event_busy</span><h4>Nothing here yet</h4>
          <p>{{ tab === 'requests' ? 'No requests waiting for approval.' : 'Book a treatment to get started.' }}</p>
        </div>
      </div>
    </div>
    <button class="fab" @click="go('doctors')"><span class="ms">add</span>Book</button>
  </div>
</template>
