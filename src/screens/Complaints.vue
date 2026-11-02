<script setup>
import { state, go, fmtDate } from '../store'
import AppBar from '../components/AppBar.vue'

const ICON = { Treatment: 'healing', Appointment: 'event', Order: 'local_shipping', Payment: 'payments', Staff: 'badge', Other: 'more_horiz' }
</script>

<template>
  <div class="scr">
    <AppBar title="My complaints" />
    <div class="body">
      <div class="banner"><span class="ms">support_agent</span><span>Our client care team reviews every complaint and replies here, usually within 24 hours.</span></div>
      <div class="stack mt16">
        <button v-for="c in state.complaints" :key="c.id" class="card" style="text-align: left" @click="go('complaint', { id: c.id })">
          <div class="row top">
            <span class="ic sm" :class="{ grey: c.status === 'resolved' }"><span class="ms">{{ ICON[c.category] ?? 'flag' }}</span></span>
            <div class="grow">
              <div class="row between top"><b style="font-weight: 500">{{ c.subject }}</b><span class="badge" :class="c.status">{{ c.status.replace('-', ' ') }}</span></div>
              <div class="muted small mt4">{{ c.category }} · {{ fmtDate(c.date) }}</div>
              <p v-if="c.reply" class="small mt8 ellip" style="color: var(--teal-deep)"><span class="ms" style="font-size: 14px">reply</span> {{ c.reply }}</p>
            </div>
          </div>
        </button>
      </div>
      <div v-if="!state.complaints.length" class="empty"><span class="ms">sentiment_satisfied</span><h4>No complaints</h4><p>We hope it stays that way!</p></div>
    </div>
    <button class="fab" @click="go('new-complaint')"><span class="ms">edit</span>New complaint</button>
  </div>
</template>
