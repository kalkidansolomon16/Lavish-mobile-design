<script setup>
// Initials avatar — stands in for profile photos until real images exist.
import { computed } from 'vue'
const p = defineProps({ name: String, size: { type: Number, default: 44 }, hue: Number, online: Boolean })
const initials = computed(() => p.name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join(''))
const h = computed(() => p.hue ?? [...p.name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360)
</script>

<template>
  <div class="avatar" :style="{ width: size + 'px', height: size + 'px', fontSize: size * 0.4 + 'px', background: `linear-gradient(135deg, hsl(${h} 32% 60%), hsl(${h} 38% 38%))` }">
    {{ initials }}<i v-if="online" class="online"></i>
  </div>
</template>
