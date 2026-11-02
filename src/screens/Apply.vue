<script setup>
import { reactive } from 'vue'
import { state, go, course, etb, fmtDate, actions, SUCCESS } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const c = course(p.params.id ?? 3)
const f = reactive({ experience: 'Some experience', group: 'Weekend', why: '' })
function submit() {
  actions.applyCourse(c.id)
  state.stack = [{ name: 's-courses', params: {} }]
  go('success', SUCCESS.application(c))
}
</script>

<template>
  <div class="scr">
    <AppBar title="Apply" :sub="c.title" />
    <div class="body">
      <div class="card row"><span class="ic gold"><span class="ms">school</span></span><div class="grow"><b style="font-weight: 500">{{ c.title }}</b><div class="muted small">{{ c.weeks }} weeks · starts {{ fmtDate(c.start, { day: 'numeric', month: 'long' }) }}</div></div></div>

      <div class="field mt20"><label>Highest education</label><div class="input"><span class="ms">workspace_premium</span><select><option>Diploma</option><option>Bachelor's degree</option><option>Nursing / medical licence</option><option>High school</option></select></div></div>
      <div class="field"><label>Experience in beauty or healthcare</label>
        <div class="stack" style="gap: 8px">
          <button v-for="x in ['No experience', 'Some experience', 'Working professional']" :key="x" class="radio-card" :class="{ on: f.experience === x }" @click="f.experience = x"><span class="r"></span><b>{{ x }}</b></button>
        </div>
      </div>
      <div class="field"><label>Preferred group</label><div class="seg"><button v-for="g in ['Weekday', 'Weekend']" :key="g" :class="{ on: f.group === g }" @click="f.group = g">{{ g }}</button></div></div>
      <div class="field"><label>Why do you want to join?</label><textarea v-model="f.why" class="ta" placeholder="Tell the academy team about your goals…"></textarea></div>
      <div class="field"><label>ID or certificate (optional)</label><div class="upload"><span class="ms">upload_file</span>Tap to upload a photo or PDF</div></div>
      <div class="banner"><span class="ms">info</span><span>No payment now. The General Manager reviews your application, then you pay the <b>{{ etb(c.price) }}</b> fee to confirm your seat.</span></div>
    </div>
    <div class="foot"><button class="btn" @click="submit"><span class="ms">send</span>Submit application</button></div>
  </div>
</template>
