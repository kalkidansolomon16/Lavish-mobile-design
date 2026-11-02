<script setup>
import { computed } from 'vue'
import { state, go, doctor, canChat } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'

// Every doctor the client has booked with; chat only unlocks after a completed treatment.
const docs = computed(() => [...new Set(state.appointments.filter((a) => a.doctorId && a.status !== 'cancelled').map((a) => a.doctorId))]
  .map(doctor).sort((a, b) => canChat(b.id) - canChat(a.id)))
const last = (id) => state.chats[id]?.at(-1)
</script>

<template>
  <div class="scr">
    <AppBar title="Messages" root />
    <div class="body">
      <div class="banner"><span class="ms">verified_user</span><span>Chat privately with your doctor from anywhere, after your first treatment with them.</span></div>

      <div class="list mt16">
        <template v-for="d in docs" :key="d.id">
          <button v-if="canChat(d.id)" class="li" @click="go('chat', { key: d.id })">
            <Avatar :name="d.name" :hue="d.hue" :size="50" :online="d.status === 'Available'" />
            <span class="grow"><span class="row between"><b>{{ d.name }}</b><small>{{ last(d.id)?.time }}</small></span><small class="ellip">{{ last(d.id) ? (last(d.id).from === 'me' ? 'You: ' : '') + last(d.id).text : 'Say hello 👋' }}</small></span>
            <span v-if="last(d.id)?.from === 'them'" class="badge" style="background: var(--dark); color: #fff; padding: 2px 7px">1</span>
          </button>
          <button v-else class="li" style="opacity: .75" @click="go('chat', { key: d.id })">
            <div style="position: relative"><Avatar :name="d.name" :hue="d.hue" :size="50" style="filter: grayscale(.7)" /></div>
            <span class="grow"><b>{{ d.name }}</b><small><span class="ms" style="font-size: 13px">lock</span> Unlocks after your first treatment</small></span>
          </button>
        </template>
      </div>

      <div v-if="!docs.length" class="empty"><span class="ms">forum</span><h4>No conversations yet</h4><p>Book and complete a treatment to chat with your doctor.</p><button class="btn auto" @click="go('doctors')">Find a doctor</button></div>
    </div>
  </div>
</template>
