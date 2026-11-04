<script setup>
import { computed } from 'vue'
import { state, go, doctor, fmtDate, etb, canChat, actions, notify } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import Steps from '../components/Steps.vue'

const p = defineProps({ params: Object })
const a = state.appointments.find((x) => x.id === p.params.id) ?? state.appointments[0]
const d = a.doctorId ? doctor(a.doctorId) : null
const paid = computed(() => a.payment.status === 'paid')

const HEAD = {
  pending: { icon: 'hourglass_top', t: 'Waiting for approval', p: 'Reception is reviewing your request. You’ll get a notification once it’s approved.' },
  approved: { icon: 'event_available', t: 'Confirmed', p: `Reception approved your booking and ${d?.name ?? 'your doctor'} has been notified. See you soon!` },
  completed: { icon: 'task_alt', t: 'Treatment completed', p: 'You can now chat with your doctor any time about your results and aftercare.' },
  declined: { icon: 'event_busy', t: 'Request declined', p: 'Reception couldn’t fit this slot. Please choose another date or time.' },
  cancelled: { icon: 'block', t: 'Cancelled', p: 'You cancelled this request.' },
}
// Online sessions: reception confirms, the client pays in the app, then the video link unlocks.
const ONLINE_HEAD = {
  pending: { icon: 'hourglass_top', t: 'Waiting for confirmation', p: 'Reception is checking the doctor’s schedule. You’ll get a notification once your online session is confirmed.' },
  approved: { icon: 'video_call', t: 'Online session confirmed', p: `Reception confirmed your session and ${d?.name ?? 'your doctor'} has been notified. Join from this screen at your session time.` },
  completed: { icon: 'task_alt', t: 'Session completed', p: 'You can now chat with your doctor any time about their advice.' },
  declined: { icon: 'event_busy', t: 'Request declined', p: 'Reception couldn’t fit this slot. Please choose another date or time. Any payment is refunded.' },
  cancelled: HEAD.cancelled,
}
const h = computed(() => (a.online ? ONLINE_HEAD : HEAD)[a.status])
const steps = computed(() => {
  const order = ['pending', 'approved', 'completed']
  const i = order.indexOf(a.status)
  if (a.online) return [
    { t: 'Request sent', d: 'By you', done: true },
    { t: 'Confirmed by reception', d: a.status === 'declined' ? 'Declined' : 'Front desk checks the doctor’s schedule', done: i >= 1, now: i === 0 },
    { t: paid.value ? 'Paid · video link ready' : `Pay ${etb(a.payment.amount)}`, d: paid.value ? a.payment.method : 'In the app — Telebirr, CBE Birr or card', done: paid.value, now: i === 1 && !paid.value },
    { t: 'Video call', d: `${fmtDate(a.date)} · ${a.time} · 45 min`, done: i >= 2, now: i === 1 && paid.value },
  ]
  return [
    { t: 'Request sent', d: 'By you', done: true },
    { t: 'Approved by reception', d: a.status === 'declined' ? 'Declined' : 'Front desk checks the schedule', done: i >= 1, now: i === 0 },
    { t: 'Doctor notified', d: d?.name ?? 'Reception assigns a doctor', done: i >= 1 },
    { t: 'Treatment', d: `${fmtDate(a.date)} · ${a.time}`, done: i >= 2, now: i === 1 },
  ]
})
const join = () => notify(`Opens the video call with ${d?.name ?? 'your doctor'}`)
</script>

<template>
  <div class="scr">
    <AppBar :title="(a.online ? 'Online session #' : 'Appointment #') + a.id" />
    <div class="body">
      <div class="status-head" :class="'st-' + a.status"><span class="ms">{{ h.icon }}</span><div><b>{{ h.t }}</b><p>{{ h.p }}</p></div></div>

      <div class="card mt12">
        <div class="row">
          <Avatar v-if="d" :name="d.name" :hue="d.hue" :size="48" />
          <span v-else class="ic gold" style="width: 48px; height: 48px"><span class="ms">auto_awesome</span></span>
          <div class="grow"><b style="font-weight: 500; font-size: 15px">{{ d?.name ?? 'Doctor to be assigned' }}</b><div class="muted small">{{ d?.specialty ?? 'Reception will choose' }}</div></div>
          <button v-if="d && canChat(d.id)" class="icon-btn boxed" @click="go('chat', { key: d.id })"><span class="ms">chat</span></button>
        </div>
        <div class="mt12">
          <div class="kv"><span>{{ a.online ? 'Session' : 'Treatment' }}</span><span>{{ a.online ? 'Online consultation · 45 min' : a.service }}</span></div>
          <div class="kv"><span>Date</span><span>{{ fmtDate(a.date, { weekday: 'long', day: 'numeric', month: 'long' }) }}</span></div>
          <div class="kv"><span>Time</span><span>{{ a.time }}</span></div>
          <div class="kv"><span>{{ a.online ? 'Where' : 'Branch' }}</span><span>{{ a.online ? 'Video call in the Lavish app' : a.branch }}</span></div>
          <div v-if="a.note" class="kv"><span>Your note</span><span>{{ a.note }}</span></div>
        </div>
      </div>

      <div v-if="a.online && a.status === 'approved'" class="card mt12" :style="paid ? 'background: var(--mint); border-color: var(--mint)' : ''">
        <div class="row">
          <span class="ic" :class="paid ? '' : 'grey'" :style="paid ? 'background: #fff' : ''"><span class="ms">{{ paid ? 'videocam' : 'lock' }}</span></span>
          <div class="grow">
            <b style="font-weight: 500">{{ paid ? 'Your video link is ready' : 'Video link unlocks after payment' }}</b>
            <div class="muted small">{{ paid ? a.link : 'Pay to secure your slot — reception can’t hold it unpaid.' }}</div>
          </div>
        </div>
        <p v-if="paid" class="small muted mt8">Find a quiet, well-lit spot. The Join button opens 10 minutes before {{ a.time }}.</p>
      </div>

      <div v-if="!['declined', 'cancelled'].includes(a.status)" class="card mt12"><Steps :steps="steps" /></div>

      <div class="sec" style="margin-top: 20px"><h4>Payment</h4><span class="badge" :class="a.payment.status">{{ a.payment.status }}</span></div>
      <div class="card">
        <div class="kv total"><span>Amount</span><span>{{ etb(a.payment.amount) }}</span></div>
        <template v-if="paid">
          <div class="kv"><span>Method</span><span>{{ a.payment.method }}</span></div>
          <div class="kv"><span>Reference</span><span>{{ a.payment.txRef }}</span></div>
        </template>
        <p v-else-if="!['declined', 'cancelled'].includes(a.status)" class="small muted mt8">{{ a.online ? 'Online sessions are paid in the app — Telebirr, CBE Birr or card via Chapa.' : 'Pay now in the app, or at reception on the day. Reception records cash payments.' }}</p>
      </div>

      <button class="btn ghost mt16" @click="go('new-complaint', { category: 'Appointment', ref: 'Appointment #' + a.id })"><span class="ms">flag</span>Report a problem</button>
    </div>

    <div v-if="a.status === 'pending'" class="foot">
      <button class="btn danger" @click="actions.cancel(a)">Cancel request</button>
      <button v-if="!paid" class="btn" @click="go('pay', { id: a.id })">Pay now</button>
    </div>
    <div v-else-if="a.status === 'approved' && !paid" class="foot">
      <button class="btn" @click="go('pay', { id: a.id })"><span class="ms">payments</span>Pay {{ etb(a.payment.amount) }}</button>
    </div>
    <div v-else-if="a.status === 'approved' && a.online" class="foot">
      <button class="btn" @click="join"><span class="ms">videocam</span>Join video call</button>
    </div>
    <div v-else-if="['completed', 'declined', 'cancelled'].includes(a.status)" class="foot">
      <button v-if="a.status === 'completed' && d" class="btn ghost" @click="go('chat', { key: d.id })"><span class="ms">chat</span>Chat</button>
      <button class="btn" @click="go('book', { doctorId: a.doctorId, service: a.service, online: a.online })"><span class="ms">refresh</span>Book again</button>
    </div>
  </div>
</template>
