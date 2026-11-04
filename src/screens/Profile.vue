<script setup>
import { state, go, reset } from '../store'
import Avatar from '../components/Avatar.vue'

const ACTIVITY = [
  { icon: 'calendar_month', label: 'My appointments', to: 'appointments' },
  { icon: 'receipt_long', label: 'My orders', to: 'orders' },
  { icon: 'medication', label: 'Prescriptions', to: 'prescriptions' },
  { icon: 'payments', label: 'Payments', to: 'payments' },
  { icon: 'support_agent', label: 'Complaints', to: 'complaints' },
]
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="teal-head prof-head">
        <Avatar :name="state.client.name" :hue="28" :size="80" />
        <h2>{{ state.client.name }}</h2>
        <p>{{ state.client.phone }} · {{ state.client.branch }}</p>
      </div>
      <div class="pad">
        <div class="stats lift">
          <div><b>{{ state.appointments.filter((a) => a.status === 'completed').length }}</b><small>Treatments</small></div>
          <div><b>{{ state.orders.length }}</b><small>Orders</small></div>
          <div><b>{{ state.appointments.filter((a) => ['approved', 'pending'].includes(a.status)).length }}</b><small>Upcoming</small></div>
        </div>

        <p class="label mt24" style="margin-bottom: 8px">My activity</p>
        <div class="list">
          <button v-for="m in ACTIVITY" :key="m.to" class="li" @click="go(m.to)"><span class="ic sm"><span class="ms">{{ m.icon }}</span></span><b class="grow">{{ m.label }}</b><span class="ms chev">chevron_right</span></button>
        </div>

        <p class="label mt24" style="margin-bottom: 8px">Settings</p>
        <div class="list">
          <button class="li"><span class="ic sm grey"><span class="ms">person</span></span><b class="grow">Edit profile</b><span class="ms chev">chevron_right</span></button>
          <button class="li" @click="go('notifications')"><span class="ic sm grey"><span class="ms">notifications</span></span><b class="grow">Notifications</b><span class="ms chev">chevron_right</span></button>
          <button class="li"><span class="ic sm grey"><span class="ms">translate</span></span><b class="grow">Language</b><span class="val">English</span><span class="ms chev">chevron_right</span></button>
          <button class="li"><span class="ic sm grey"><span class="ms">help</span></span><b class="grow">Help & contact</b><span class="ms chev">chevron_right</span></button>
        </div>
        <button class="btn danger mt20" @click="reset('welcome')"><span class="ms">logout</span>Log out</button>
        <p class="center small muted mt12">Lavish Medical Spa · v1.0.0</p>
      </div>
    </div>
  </div>
</template>
