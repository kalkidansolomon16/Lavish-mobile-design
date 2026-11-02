<script setup>
import { state, go, reset, course, etb } from '../store'
import Avatar from '../components/Avatar.vue'
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="teal-head prof-head">
        <Avatar :name="state.student.name" :hue="20" :size="80" />
        <h2>{{ state.student.name }}</h2>
        <p>{{ state.student.phone }} · Student</p>
      </div>
      <div class="pad">
        <div class="stats lift">
          <div><b>{{ state.enrollments.filter((e) => e.status === 'active').length }}</b><small>Active</small></div>
          <div><b>{{ state.enrollments.filter((e) => e.status === 'pending').length }}</b><small>Applications</small></div>
          <div><b>{{ state.enrollments.filter((e) => e.certificate).length }}</b><small>Certificates</small></div>
        </div>

        <p class="label mt24" style="margin-bottom: 8px">My courses</p>
        <div class="list">
          <button v-for="e in state.enrollments" :key="e.courseId" class="li" @click="e.status === 'active' ? go('my-course', { id: e.courseId }) : e.certificate ? go('certificate', { id: e.courseId }) : go('course', { id: e.courseId })">
            <span class="ic sm gold"><span class="ms">school</span></span>
            <span class="grow"><b class="ellip">{{ course(e.courseId).title }}</b><small>{{ e.paid ? 'Fee paid' : 'Fee ' + etb(course(e.courseId).price) + ' · after approval' }}</small></span>
            <span class="badge" :class="e.status === 'active' ? 'enrolled' : e.status">{{ e.status === 'active' ? 'enrolled' : e.certificate ? 'certificate' : e.status }}</span>
          </button>
        </div>

        <p class="label mt24" style="margin-bottom: 8px">Settings</p>
        <div class="list">
          <button class="li"><span class="ic sm grey"><span class="ms">person</span></span><b class="grow">Edit profile</b><span class="ms chev">chevron_right</span></button>
          <button class="li"><span class="ic sm grey"><span class="ms">translate</span></span><b class="grow">Language</b><span class="val">English</span><span class="ms chev">chevron_right</span></button>
          <button class="li" @click="go('s-chat')"><span class="ic sm grey"><span class="ms">help</span></span><b class="grow">Ask my teacher</b><span class="ms chev">chevron_right</span></button>
        </div>
        <button class="btn danger mt20" @click="reset('welcome')"><span class="ms">logout</span>Log out</button>
      </div>
    </div>
  </div>
</template>
