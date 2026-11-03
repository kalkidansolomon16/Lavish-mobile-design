<script setup>
import { computed } from 'vue'
import { state, go, course, etb, enrollment, doctor } from '../store'
import Avatar from '../components/Avatar.vue'

const active = computed(() => state.enrollments.filter((e) => e.status === 'active'))
const cert = computed(() => state.enrollments.find((e) => e.certificate))
const lastMsg = computed(() => state.chats.teacher.filter((m) => m.from === 'them').at(-1))
const teacher = doctor(1)
const explore = computed(() => state.courses.filter((c) => !enrollment(c.id)))
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="teal-head home-head">
        <div class="row">
          <Avatar :name="state.student.name" :hue="20" :size="46" />
          <div class="grow"><small class="hello">Lavish Academy</small><h2>Hi, {{ state.student.name.split(' ')[0] }}</h2></div>
          <button class="icon-btn on-dark" @click="go('s-chat')"><span class="ms">chat</span><i class="dot"></i></button>
        </div>
        <div v-for="e in active" :key="e.courseId" class="row mt20" style="gap: 16px; cursor: pointer" @click="go('my-course', { id: e.courseId })">
          <div class="ring" :style="{ '--p': e.progress }"><b>{{ e.progress }}%</b></div>
          <div class="grow">
            <span class="small" style="color: var(--mint)">Week {{ e.week }} of {{ course(e.courseId).weeks }}</span>
            <h3 style="font-size: 21px; line-height: 1.15">{{ course(e.courseId).title }}</h3>
            <span class="small" style="color: var(--gold)">Continue learning →</span>
          </div>
        </div>
      </div>

      <div class="pad">
        <div class="card next-card lift" @click="go('my-course', { id: 1 })">
          <div class="top">
            <div class="row between"><span class="label">Next session</span><span class="badge new">Practical</span></div>
            <h4>Chemical peels — hands-on</h4>
            <div class="muted small">Trainer: Dr. Meron Alemu</div>
          </div>
          <div class="bottom"><span><span class="ms">calendar_today</span>Sat</span><span><span class="ms">schedule</span>10:00</span><span><span class="ms">location_on</span>Bole training room</span></div>
        </div>

        <button v-if="cert" class="card row mt12" style="width: 100%; text-align: left; background: var(--gold-soft); border-color: #ead8cc" @click="go('certificate', { id: cert.courseId })">
          <span class="ic gold" style="background: #fff"><span class="ms">workspace_premium</span></span>
          <span class="grow"><b style="font-weight: 500">Your certificate is ready</b><small class="muted" style="display: block">{{ course(cert.courseId).title }} · download the PDF</small></span>
          <span class="ms">chevron_right</span>
        </button>


        <div class="sec"><h4>Message from your teacher</h4><a class="link" @click="go('s-chat')">Open chat</a></div>
        <button class="card row top" style="width: 100%; text-align: left" @click="go('s-chat')">
          <Avatar :name="teacher.name" :hue="teacher.hue" :size="42" online />
          <span class="grow"><span class="row between"><b style="font-weight: 500">{{ teacher.name }}</b><small class="muted">{{ lastMsg.time }}</small></span><small class="muted" style="display: block; line-height: 1.4; margin-top: 2px">{{ lastMsg.text }}</small></span>
        </button>

        <div class="sec"><h4>Explore courses</h4><a class="link" @click="go('s-courses')">See all</a></div>
        <div class="hscroll">
          <button v-for="c in explore" :key="c.id" class="card" style="width: 220px; flex-shrink: 0; text-align: left; padding: 10px" @click="go('course', { id: c.id })">
            <div class="course-art" :style="{ height: '90px', background: `linear-gradient(135deg, hsl(${c.hue} 40% 45%), hsl(${c.hue} 45% 28%))` }"><span class="ms">school</span><span class="badge" style="background: rgba(255,255,255,.2); color: #fff">{{ c.level }}</span></div>
            <b style="font-weight: 500; display: block; margin: 10px 2px 2px">{{ c.title }}</b>
            <span class="muted small" style="padding: 0 2px">{{ c.weeks }} weeks · {{ etb(c.price) }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
