<script setup>
import { state, go, back, course, fmtDate, notify, actions } from '../store'

const p = defineProps({ params: Object })
const c = course(p.params.course ?? 1)
const l = state.lessons[c.id].find((x) => x.week === (p.params.week ?? 5))
const title = c.modules[l.week - 1]
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="player">
        <button class="icon-btn on-dark" style="position: absolute; top: 52px; left: 14px" @click="back"><span class="ms">arrow_back</span></button>
        <button class="play" @click="notify('Video plays here (streamed from the academy server)')"><span class="ms f">play_arrow</span></button>
        <div class="bar"><span>{{ Math.round(l.video.mins * 0.35) }}:00</span><i></i><span>{{ l.video.mins }}:00</span></div>
      </div>
      <div class="pad mt16">
        <span class="label">Week {{ l.week }} · {{ c.title }}</span>
        <h2 style="font-size: 26px; line-height: 1.15; margin-top: 4px">{{ title }}</h2>
        <p class="muted small mt4">▶ {{ l.video.title }} · {{ l.video.mins }} min · Dr. Meron Alemu</p>

        <div class="sec"><h4>Exercise</h4><span class="badge" :class="{ graded: 'completed', submitted: 'pending', todo: 'new' }[l.exercise.status]">{{ l.exercise.status === 'todo' ? 'to do' : l.exercise.status }}</span></div>
        <div class="card">
          <b style="font-weight: 500">{{ l.exercise.title }}</b>
          <div class="meta mt8"><span><span class="ms">event</span>Due {{ fmtDate(l.exercise.due) }}</span><span v-if="l.exercise.grade"><span class="ms">grade</span>{{ l.exercise.grade }}</span></div>
          <template v-if="l.exercise.status === 'todo'">
            <div class="upload mt12"><span class="ms">upload_file</span>Upload your answer (PDF, photo or video)</div>
            <textarea class="ta mt12" placeholder="Or write your answer here…"></textarea>
          </template>
          <div v-else-if="l.exercise.status === 'submitted'" class="banner warn mt12"><span class="ms">hourglass_top</span><span>Submitted — your teacher will grade it soon.</span></div>
          <div v-else class="banner ok mt12"><span class="ms">verified</span><span>Graded <b>{{ l.exercise.grade }}</b> — great work!</span></div>
        </div>

        <div class="sec"><h4>Materials</h4></div>
        <div class="list">
          <button class="li" @click="notify('Downloading notes')"><span class="ic sm gold"><span class="ms">description</span></span><b class="grow small">Week {{ l.week }} notes.pdf</b><span class="ms" style="color: var(--dark)">download</span></button>
        </div>
        <button class="btn ghost mt16" @click="go('s-chat')"><span class="ms">chat</span>Ask your teacher</button>
      </div>
    </div>
    <div v-if="l.exercise.status === 'todo'" class="foot"><button class="btn" @click="actions.submitExercise(l)"><span class="ms">send</span>Submit exercise</button></div>
  </div>
</template>
