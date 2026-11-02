<script setup>
import { reactive, computed } from 'vue'
import { go, doctor, service, SERVICES, BRANCHES, day, etb } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const d = p.params.doctorId ? doctor(p.params.doctorId) : null
const options = d ? d.skills.map(service) : SERVICES
const f = reactive({
  service: options.some((o) => o.name === p.params.service) ? p.params.service : options[0].name,
  date: day(1), time: p.params.time || '', branch: d?.branch || BRANCHES[0], note: '',
})
const days = Array.from({ length: 14 }, (_, i) => day(i + 1))
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
// Fake "already booked" slots so the picker looks real; the API returns these per doctor/day.
const taken = computed(() => TIMES.filter((_, i) => (i * 7 + Number(f.date.slice(-2))) % 4 === 0))
if (f.time && taken.value.includes(f.time)) f.time = TIMES.find((t) => !taken.value.includes(t))
const wd = (x) => new Date(x + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short' })
const dd = (x) => new Date(x + 'T00:00').getDate()
function pickDate(x) { f.date = x; if (taken.value.includes(f.time)) f.time = '' }
</script>

<template>
  <div class="scr">
    <AppBar title="Book appointment" :sub="d ? d.name : 'Reception will assign a doctor'" />
    <div class="body">
      <div v-if="d" class="card row"><Avatar :name="d.name" :hue="d.hue" :size="44" /><div class="grow"><b style="font-weight: 500">{{ d.name }}</b><div class="muted small">{{ d.specialty }} · {{ d.branch }}</div></div></div>
      <div v-else class="banner gold"><span class="ms">auto_awesome</span><span>Reception will match you with the best available specialist for your treatment and time.</span></div>

      <div class="sec" style="margin-top: 20px"><h4>Treatment</h4></div>
      <div class="stack" style="gap: 8px">
        <button v-for="s in options" :key="s.name" class="radio-card" :class="{ on: f.service === s.name }" @click="f.service = s.name">
          <span class="r"></span>
          <span class="grow"><b>{{ s.name }}</b><small>{{ s.mins }} min</small></span>
          <span class="price" style="font-size: 15px">{{ etb(s.price) }}</span>
        </button>
      </div>

      <template v-if="!d">
        <div class="sec" style="margin-top: 20px"><h4>Branch</h4></div>
        <div class="chips"><button v-for="b in BRANCHES" :key="b" class="chip" :class="{ on: f.branch === b }" @click="f.branch = b"><span class="ms">location_on</span>{{ b.replace('Addis Ababa – ', '') }}</button></div>
      </template>

      <div class="sec" style="margin-top: 20px"><h4>Date</h4><span class="muted small">{{ new Date(f.date + 'T00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) }}</span></div>
      <div class="date-strip">
        <button v-for="x in days" :key="x" :class="{ on: f.date === x }" @click="pickDate(x)"><small>{{ wd(x) }}</small><b>{{ dd(x) }}</b></button>
      </div>

      <div class="sec" style="margin-top: 20px"><h4>Time</h4><span class="muted small">{{ 12 - taken.length }} slots free</span></div>
      <div class="slots"><button v-for="t in TIMES" :key="t" :disabled="taken.includes(t)" :class="{ on: f.time === t }" @click="f.time = t">{{ t }}</button></div>

      <div class="sec" style="margin-top: 20px"><h4>Notes for the doctor</h4><span class="muted small">Optional</span></div>
      <textarea v-model="f.note" class="ta" placeholder="Describe your skin concern, allergies or anything we should know…"></textarea>
    </div>
    <div class="foot">
      <div class="sum"><small>Price</small><b>{{ etb(service(f.service).price) }}</b></div>
      <button class="btn" :disabled="!f.time" @click="go('book-review', { doctorId: d?.id ?? null, ...f })">{{ f.time ? 'Continue' : 'Pick a time' }}</button>
    </div>
  </div>
</template>
