<script setup>
import { state, back, go, fmtDate } from '../store'

const p = defineProps({ params: Object })
const n = state.news.find((x) => x.id === p.params.id) ?? state.news[0]
const CTA = { 'New treatment': ['Book now', 'doctors'], Offer: ['Shop now', 'shop'] }
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="news-art" :style="{ height: '280px', borderRadius: '0 0 30px 30px', padding: '20px', background: `linear-gradient(135deg, hsl(${n.hue} 40% 42%), hsl(${n.hue} 45% 24%))` }">
        <button class="icon-btn on-dark" style="position: absolute; top: 52px; left: 14px" @click="back"><span class="ms" style="position: static; font-size: 22px">arrow_back</span></button>
        <span class="ms" style="font-size: 54px; top: 110px; right: 24px">{{ n.icon }}</span>
        <div><span class="badge">{{ n.tag }}</span><h2 style="font-size: 30px; line-height: 1.1; margin-top: 8px">{{ n.title }}</h2></div>
      </div>
      <div class="pad mt20">
        <p class="label">{{ fmtDate(n.date, { weekday: 'long', day: 'numeric', month: 'long' }) }} · Lavish Medical Spa</p>
        <p class="mt12" style="line-height: 1.65; font-size: 15px; color: #3d3d3d">{{ n.body }}</p>
      </div>
    </div>
    <div v-if="CTA[n.tag]" class="foot"><button class="btn" @click="go(CTA[n.tag][1])">{{ CTA[n.tag][0] }}</button></div>
  </div>
</template>
