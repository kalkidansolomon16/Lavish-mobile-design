<script setup>
import { reactive, computed } from 'vue'
import { state, go, notify, actions, SUCCESS } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const CATS = [
  { k: 'Treatment', icon: 'healing' }, { k: 'Appointment', icon: 'event' }, { k: 'Order', icon: 'local_shipping' },
  { k: 'Payment', icon: 'payments' }, { k: 'Staff', icon: 'badge' }, { k: 'Other', icon: 'more_horiz' },
]
const f = reactive({ category: p.params.category || 'Treatment', ref: p.params.ref || '', subject: '', message: '', priority: 'medium' })
const refs = computed(() => [
  ...state.appointments.map((a) => `Appointment #${a.id} · ${a.service}`),
  ...state.orders.map((o) => `Order #${o.id}`),
])
function submit() {
  if (!f.subject.trim() || !f.message.trim()) return notify('Please add a subject and describe the problem')
  const c = actions.addComplaint({ ...f })
  state.stack = [{ name: 'home', params: {} }]
  go('success', SUCCESS.complaint(c))
}
</script>

<template>
  <div class="scr">
    <AppBar title="New complaint" sub="Tell us what went wrong" />
    <div class="body">
      <div class="field"><label>What is it about?</label>
        <div class="chips" style="flex-wrap: wrap; margin: 0; padding: 0"><button v-for="c in CATS" :key="c.k" class="chip" :class="{ on: f.category === c.k }" @click="f.category = c.k"><span class="ms">{{ c.icon }}</span>{{ c.k }}</button></div>
      </div>
      <div class="field"><label>Related to (optional)</label>
        <div class="input"><span class="ms">link</span><select v-model="f.ref"><option value="">Nothing specific</option><option v-if="f.ref && !refs.some((r) => r.startsWith(f.ref))" :value="f.ref">{{ f.ref }}</option><option v-for="r in refs" :key="r" :value="r.split(' · ')[0]">{{ r }}</option></select></div>
      </div>
      <div class="field"><label>Subject</label><div class="input"><input v-model="f.subject" placeholder="e.g. Redness after my session" /></div></div>
      <div class="field"><label>Describe the problem</label><textarea v-model="f.message" class="ta" placeholder="What happened, when, and how can we help?"></textarea></div>
      <div class="field"><label>How urgent is it?</label>
        <div class="seg"><button v-for="u in ['low', 'medium', 'high']" :key="u" :class="{ on: f.priority === u }" style="text-transform: capitalize" @click="f.priority = u">{{ u }}</button></div>
      </div>
      <div class="field"><label>Photos (optional)</label><div class="photos"><div class="ph"><span class="ms">image</span></div><div><span class="ms">add_a_photo</span></div></div></div>
      <div v-if="f.priority === 'high' && f.category === 'Treatment'" class="banner bad"><span class="ms">emergency</span><span>For a medical emergency, call us now at <b>+251 911 000 000</b> or go to the nearest hospital.</span></div>
    </div>
    <div class="foot"><button class="btn" @click="submit"><span class="ms">send</span>Submit complaint</button></div>
  </div>
</template>
