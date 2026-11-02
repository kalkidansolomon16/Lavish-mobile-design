<script setup>
import { state, go } from '../store'
import AppBar from '../components/AppBar.vue'

function open(n) { n.unread = false; go(n.to, n.params) }
const readAll = () => state.notifications.forEach((n) => (n.unread = false))
</script>

<template>
  <div class="scr">
    <AppBar title="Notifications"><button class="link small" style="padding: 0 10px" @click="readAll">Mark all read</button></AppBar>
    <div class="body">
      <div class="list">
        <button v-for="n in state.notifications" :key="n.id" class="li" :style="{ background: n.unread ? '#f2f8f7' : '' }" style="align-items: flex-start" @click="open(n)">
          <span class="ic sm"><span class="ms">{{ n.icon }}</span></span>
          <span class="grow"><span class="row between"><b :style="{ fontWeight: n.unread ? 600 : 500 }">{{ n.title }}</b><small>{{ n.time }}</small></span><small style="line-height: 1.4">{{ n.text }}</small></span>
          <span v-if="n.unread" style="width: 8px; height: 8px; border-radius: 50%; background: var(--gold); margin-top: 6px; flex-shrink: 0"></span>
        </button>
      </div>
    </div>
  </div>
</template>
