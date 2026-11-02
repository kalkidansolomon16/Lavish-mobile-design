<script setup>
import { inject, onMounted } from 'vue'
import { state, reset } from '../store'
const live = inject('live', false)
onMounted(() => {
  if (live) setTimeout(() => state.stack.at(-1).name === 'splash' && reset('welcome'), 1800)
})
</script>

<template>
  <div class="scr splash" @click="reset('welcome')">
    <div class="pattern"></div>
    <div class="mid"><img src="/img/logo-white.png" alt="Lavish" /><small>MEDICAL SPA · ACADEMY</small></div>
    <div class="loader"><i></i><i></i><i></i></div>
  </div>
</template>
