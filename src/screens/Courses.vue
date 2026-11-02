<script setup>
import { ref, computed } from 'vue'
import { state, go, etb, fmtDate, enrollment } from '../store'
import AppBar from '../components/AppBar.vue'

const lvl = ref('All')
const list = computed(() => state.courses.filter((c) => lvl.value === 'All' || c.level === lvl.value))
const tag = (c) => ({ active: 'enrolled', pending: 'pending' })[enrollment(c.id)?.status]
</script>

<template>
  <div class="scr">
    <AppBar title="Courses" root />
    <div class="body">
      <div class="chips"><button v-for="l in ['All', 'Beginner', 'Intermediate', 'Advanced']" :key="l" class="chip" :class="{ on: lvl === l }" @click="lvl = l">{{ l }}</button></div>
      <div class="stack mt16">
        <button v-for="c in list" :key="c.id" class="card" style="text-align: left; padding: 10px" @click="go('course', { id: c.id })">
          <div class="course-art" :style="{ background: `linear-gradient(135deg, hsl(${c.hue} 40% 45%), hsl(${c.hue} 45% 28%))` }">
            <span class="ms">school</span>
            <div class="row" style="gap: 6px"><span class="badge" style="background: rgba(255,255,255,.2); color: #fff">{{ c.level }}</span><span v-if="tag(c)" class="badge" :class="tag(c)">{{ tag(c) }}</span></div>
          </div>
          <div style="padding: 10px 4px 2px">
            <b style="font-weight: 500; font-size: 16px">{{ c.title }}</b>
            <div class="meta mt8"><span><span class="ms">schedule</span>{{ c.weeks }} weeks</span><span><span class="ms">event</span>Starts {{ fmtDate(c.start, { day: 'numeric', month: 'short' }) }}</span><span><span class="ms">location_on</span>{{ c.mode.split(' · ')[1] }}</span></div>
            <div class="row between mt8"><span class="price">{{ etb(c.price) }}</span><span class="link small">Details →</span></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
