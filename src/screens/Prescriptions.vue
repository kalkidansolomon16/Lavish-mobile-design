<script setup>
import { state, go, doctor, fmtDate } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
</script>

<template>
  <div class="scr">
    <AppBar title="Prescriptions" sub="Products recommended by your doctors" />
    <div class="body">
      <div class="stack">
        <button v-for="rx in state.prescriptions" :key="rx.id" class="card" style="text-align: left" @click="go('prescription', { id: rx.id })">
          <div class="row">
            <Avatar :name="doctor(rx.doctorId).name" :hue="doctor(rx.doctorId).hue" :size="44" />
            <div class="grow"><b style="font-weight: 500">{{ doctor(rx.doctorId).name }}</b><div class="muted small">{{ fmtDate(rx.date) }} · {{ rx.items.length }} products</div></div>
            <span class="badge" :class="rx.status">{{ rx.status === 'sent' ? 'new' : rx.status }}</span>
          </div>
          <p class="small muted mt12" style="line-height: 1.45">{{ rx.note }}</p>
        </button>
      </div>
      <div v-if="!state.prescriptions.length" class="empty"><span class="ms">medication</span><h4>No prescriptions yet</h4><p>Your doctor can send product recommendations after a treatment.</p></div>
    </div>
  </div>
</template>
