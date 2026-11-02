<script setup>
import { state, course, doctor, fmtDate, notify } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const e = state.enrollments.find((x) => x.courseId === (p.params.id ?? 4) && x.certificate) ?? state.enrollments.find((x) => x.certificate)
const c = course(e.courseId)
const cert = e.certificate
</script>

<template>
  <div class="scr">
    <AppBar title="Certificate" :sub="c.title" />
    <div class="body">
      <div class="cert-m">
        <img src="/img/logo-white.png" class="auth-logo" alt="Lavish" />
        <p class="label" style="margin-top: 6px; color: var(--gold)">Lavish Academy</p>
        <div class="t">Certificate of Completion</div>
        <p class="mt8">This certifies that</p>
        <div class="who">{{ state.student.name }}</div>
        <p>has successfully completed<br /><b style="color: var(--ink)">{{ c.title }}</b></p>
        <div class="sig">
          <div><b>{{ cert.by }}</b>General Manager</div>
          <div style="text-align: right"><b>{{ doctor(c.teacherIds[0]).name }}</b>Lead teacher</div>
        </div>
        <p class="mt12" style="font-size: 10.5px">No. {{ cert.no }} · {{ fmtDate(cert.date, { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
      </div>
      <div class="banner ok mt16"><span class="ms">verified</span><span>Issued by the General Manager. Anyone can verify it with the certificate number.</span></div>
    </div>
    <div class="foot">
      <button class="btn ghost" @click="notify('Share sheet opens')"><span class="ms">share</span>Share</button>
      <button class="btn" @click="notify('Certificate PDF saved to your phone')"><span class="ms">download</span>Download PDF</button>
    </div>
  </div>
</template>
