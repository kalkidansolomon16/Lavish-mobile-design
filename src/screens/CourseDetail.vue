<script setup>
import { computed } from 'vue'
import { go, back, course, enrollment, doctor, etb, fmtDate } from '../store'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const c = course(p.params.id ?? 3)
const e = computed(() => enrollment(c.id))
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="course-art" :style="{ height: '260px', borderRadius: '0 0 30px 30px', padding: '20px', background: `linear-gradient(135deg, hsl(${c.hue} 40% 45%), hsl(${c.hue} 45% 26%))` }">
        <button class="icon-btn on-dark" style="position: absolute; top: 52px; left: 14px" @click="back"><span class="ms">arrow_back</span></button>
        <div><span class="badge" style="background: rgba(255,255,255,.2); color: #fff">{{ c.level }}</span><h2 style="font-size: 30px; line-height: 1.1; margin-top: 8px">{{ c.title }}</h2></div>
      </div>
      <div class="pad">
        <div class="stats lift" style="margin-top: -22px">
          <div><b>{{ c.weeks }}</b><small>Weeks</small></div>
          <div><b>{{ c.modules.length }}</b><small>Modules</small></div>
          <div><b>{{ fmtDate(c.start, { day: 'numeric', month: 'short' }) }}</b><small>Starts</small></div>
        </div>
        <div v-if="c.requirement" class="banner warn mt12"><span class="ms">verified_user</span><span>{{ c.requirement }}</span></div>

        <div class="sec"><h4>About the course</h4></div>
        <p style="line-height: 1.55; color: #4a4a4a">{{ c.about }}</p>

        <div class="sec"><h4>What you'll learn</h4></div>
        <div class="card" style="padding: 4px 16px">
          <div v-for="(m, i) in c.modules" :key="m" class="module"><span class="n">{{ i + 1 }}</span><span>{{ m }}</span></div>
        </div>

        <div class="sec"><h4>Details</h4></div>
        <div class="card">
          <div class="kv"><span>Format</span><span>{{ c.mode }}</span></div>
          <div class="kv"><span>Schedule</span><span>Weekday or weekend groups</span></div>
          <div class="kv"><span>Certificate</span><span>Lavish Academy certificate</span></div>
          <div class="kv total"><span>Course fee</span><span>{{ etb(c.price) }}</span></div>
        </div>

        <div class="sec"><h4>Your teachers</h4></div>
        <div class="list">
          <div v-for="id in c.teacherIds" :key="id" class="li"><Avatar :name="doctor(id).name" :hue="doctor(id).hue" :size="42" /><span class="grow"><b>{{ doctor(id).name }}</b><small>{{ doctor(id).specialty }} · {{ doctor(id).years }} years</small></span></div>
        </div>
        <p class="small muted mt8">Once enrolled, you can chat with your teachers in the app.</p>
      </div>
    </div>
    <div class="foot">
      <button v-if="e?.status === 'active'" class="btn" @click="go('my-course', { id: c.id })"><span class="ms">play_circle</span>Open my course</button>
      <button v-else-if="e?.status === 'completed'" class="btn gold" @click="go('certificate', { id: c.id })"><span class="ms">workspace_premium</span>View certificate</button>
      <button v-else-if="e?.status === 'pending'" class="btn soft" disabled><span class="ms">hourglass_top</span>Application under review</button>
      <button v-else class="btn" @click="go('apply', { id: c.id })">Apply now · {{ etb(c.price) }}</button>
    </div>
  </div>
</template>
