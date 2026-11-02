<script setup>
defineProps({ steps: Array })
</script>

<template>
  <div class="steps">
    <div v-for="(s, i) in steps" :key="i" class="step" :class="{ done: s.done, now: s.now }">
      <div class="dot"><span v-if="s.done" class="ms">check</span></div>
      <div><b>{{ s.t }}</b><small v-if="s.d">{{ s.d }}</small></div>
    </div>
  </div>
</template>
