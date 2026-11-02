<script setup>
// One confirmation screen reused by booking, payment, order, complaint and course application.
import { go, reset, homeOf } from '../store'
import Steps from '../components/Steps.vue'

const p = defineProps({ params: Object })
const s = p.params
function primary() {
  const h = homeOf()
  reset(h)
  if (s.primary.to !== h) go(s.primary.to, s.primary.params ?? {})
}
</script>

<template>
  <div class="scr success">
    <div class="body">
      <div class="burst"><span class="ms f">{{ s.icon }}</span></div>
      <h2>{{ s.title }}</h2>
      <p class="muted">{{ s.text }}</p>
      <div v-if="s.receipt" class="card"><div v-for="[k, v] in s.receipt" :key="k" class="kv"><span>{{ k }}</span><span>{{ v }}</span></div></div>
      <div v-if="s.steps" class="card" :class="{ mt12: s.receipt }"><Steps :steps="s.steps" /></div>
    </div>
    <div class="foot col">
      <button class="btn" @click="primary">{{ s.primary.label }}</button>
      <button class="btn ghost" @click="reset(s.secondary?.to ?? homeOf())">{{ s.secondary?.label ?? 'Done' }}</button>
    </div>
  </div>
</template>
