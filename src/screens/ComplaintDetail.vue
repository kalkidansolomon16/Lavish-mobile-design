<script setup>
import { ref } from 'vue'
import { state, fmtDate, notify } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import Steps from '../components/Steps.vue'

const p = defineProps({ params: Object })
const c = state.complaints.find((x) => x.id === p.params.id) ?? state.complaints[0]
const i = ['open', 'in-review', 'resolved'].indexOf(c.status)
const steps = [
  { t: 'Submitted', d: fmtDate(c.date), done: true },
  { t: 'In review by client care', d: 'The General Manager tracks every complaint', done: i >= 2, now: i < 2 },
  { t: 'Resolved', d: i === 2 ? 'Closed' : 'You’ll be notified', done: i === 2 },
]
const more = ref('')
const rated = ref('')
</script>

<template>
  <div class="scr">
    <AppBar :title="c.subject" :sub="`#${c.id} · ${c.category}${c.ref ? ' · ' + c.ref : ''}`" />
    <div class="body">
      <div class="row between"><span class="badge" :class="c.status">{{ c.status.replace('-', ' ') }}</span><span class="badge" :class="c.priority">{{ c.priority }} priority</span></div>
      <div class="card mt12"><Steps :steps="steps" /></div>

      <div class="sec" style="margin-top: 20px"><h4>Conversation</h4></div>
      <div class="msgs" style="padding: 0">
        <div class="bubble me">{{ c.message }}<small>You · {{ fmtDate(c.date) }}</small></div>
        <template v-if="c.reply">
          <div class="row" style="gap: 8px; margin-top: 6px"><Avatar name="Client Care" :hue="185" :size="26" /><span class="small muted">Lavish Client Care</span></div>
          <div class="bubble">{{ c.reply }}<small>Client care</small></div>
        </template>
        <div v-else class="banner grey"><span class="ms">schedule</span><span>Waiting for a reply from client care.</span></div>
      </div>

      <div v-if="c.status === 'resolved'" class="card mt20 center">
        <b style="font-weight: 500">Was this resolved well?</b>
        <div class="row mt12" style="justify-content: center; gap: 12px">
          <button class="btn sm" :class="rated === 'up' ? '' : 'ghost'" @click="rated = 'up'; notify('Thanks for your feedback!')"><span class="ms">thumb_up</span>Yes</button>
          <button class="btn sm" :class="rated === 'down' ? '' : 'ghost'" @click="rated = 'down'; notify('Thanks — we will follow up')"><span class="ms">thumb_down</span>No</button>
        </div>
      </div>
    </div>
    <form v-if="c.status !== 'resolved'" class="composer" @submit.prevent="more && (notify('Added to your complaint'), (more = ''))">
      <input v-model="more" placeholder="Add more details…" />
      <button class="send"><span class="ms f">send</span></button>
    </form>
  </div>
</template>
