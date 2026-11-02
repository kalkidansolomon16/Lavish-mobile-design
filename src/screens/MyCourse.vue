<script setup>
import { computed } from 'vue'
import { state, go, course, enrollment, doctor } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const c = course(p.params.id ?? 1)
const e = enrollment(c.id) ?? { progress: 0, week: 1 }
// Modules come from the General Manager's learning path; videos + exercises are added by the teacher.
const lessons = state.lessons[c.id] ?? []
const lessonFor = (week) => lessons.find((l) => l.week === week)
const done = computed(() => lessons.filter((l) => l.exercise.status === 'graded').length)
const todo = computed(() => lessons.filter((l) => l.exercise.status === 'todo').length)
const SESSIONS = [
  { d: 'Sat', t: '10:00', title: 'Chemical peels — practical', where: 'Bole training room', kind: 'Practical' },
  { d: 'Tue', t: '14:00', title: 'Microdermabrasion — theory', where: 'Online (Zoom)', kind: 'Theory' },
  { d: 'Thu', t: '10:00', title: 'Microdermabrasion — practical', where: 'Bole training room', kind: 'Practical' },
]
const STATUS = { graded: ['Graded', 'completed'], submitted: ['Submitted', 'pending'], todo: ['To do', 'new'] }
</script>

<template>
  <div class="scr">
    <AppBar title="My course" :sub="c.title" />
    <div class="body">
      <div class="card" style="background: var(--dark); color: #fff; border: 0">
        <div class="row" style="gap: 16px">
          <div class="ring" :style="{ '--p': e.progress }"><b style="background: var(--teal-deep)">{{ e.progress }}%</b></div>
          <div class="grow">
            <span class="small" style="color: var(--mint)">Week {{ e.week }} of {{ c.weeks }}</span>
            <h3 style="font-size: 20px">{{ done }} exercises graded</h3>
            <span class="small" style="color: var(--gold)">{{ todo }} exercise due soon</span>
          </div>
        </div>
      </div>

      <div class="sec"><h4>Schedule</h4></div>
      <div class="list">
        <div v-for="s in SESSIONS" :key="s.title" class="li">
          <span class="ic sm" style="flex-direction: column; font-size: 10px; line-height: 1.1; font-weight: 600">{{ s.d }}<br />{{ s.t }}</span>
          <span class="grow"><b>{{ s.title }}</b><small>{{ s.where }}</small></span>
          <span class="badge" :class="s.kind === 'Practical' ? 'new' : ''">{{ s.kind }}</span>
        </div>
      </div>

      <div class="sec"><h4>Modules</h4><span class="muted small">Videos & exercises</span></div>
      <div class="card" style="padding: 4px 16px">
        <component :is="lessonFor(i + 1) ? 'button' : 'div'" v-for="(m, i) in c.modules" :key="m" class="module" style="width: 100%; text-align: left" :class="{ done: lessonFor(i + 1)?.exercise.status === 'graded', now: lessonFor(i + 1)?.exercise.status !== 'graded' && lessonFor(i + 1), locked: !lessonFor(i + 1) }" @click="lessonFor(i + 1) && go('lesson', { course: c.id, week: i + 1 })">
          <span class="n"><span v-if="lessonFor(i + 1)?.exercise.status === 'graded'" class="ms" style="font-size: 16px">check</span><template v-else>{{ i + 1 }}</template></span>
          <span class="grow">
            {{ m }}
            <small v-if="lessonFor(i + 1)" class="muted" style="display: block; font-size: 11.5px; margin-top: 2px">▶ {{ lessonFor(i + 1).video.mins }} min video · ✎ {{ lessonFor(i + 1).exercise.title }}</small>
            <small v-else class="muted" style="display: block; font-size: 11.5px; margin-top: 2px">Opens when your teacher publishes it</small>
          </span>
          <span v-if="lessonFor(i + 1)" class="badge" :class="STATUS[lessonFor(i + 1).exercise.status][1]">{{ STATUS[lessonFor(i + 1).exercise.status][0] }}</span>
          <span v-else class="ms" style="font-size: 17px; color: #c4c3c0">lock</span>
        </component>
      </div>

      <div class="sec"><h4>Your teachers</h4></div>
      <div class="list">
        <button v-for="id in c.teacherIds" :key="id" class="li" @click="go('s-chat')">
          <Avatar :name="doctor(id).name" :hue="doctor(id).hue" :size="42" online />
          <span class="grow"><b>{{ doctor(id).name }}</b><small>{{ doctor(id).specialty }}</small></span>
          <span class="ms" style="color: var(--dark)">chat</span>
        </button>
      </div>

      <div class="card row mt16" style="opacity: .7"><span class="ic grey"><span class="ms">workspace_premium</span></span><div class="grow"><b style="font-weight: 500">Certificate</b><div class="muted small">Issued by the General Manager when you finish the course</div></div><span class="ms muted">lock</span></div>
    </div>
  </div>
</template>
