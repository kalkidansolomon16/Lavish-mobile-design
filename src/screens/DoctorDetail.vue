<script setup>
import { state, go, back, doctor, service, etb, canChat, notify } from '../store'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const d = doctor(p.params.id ?? 1)
const chat = () => (canChat(d.id) ? go('chat', { key: d.id }) : notify('Chat unlocks after your first treatment'))
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="teal-head doc-hero">
        <div class="bar"><button class="icon-btn on-dark" @click="back"><span class="ms">arrow_back</span></button><button class="icon-btn on-dark"><span class="ms">favorite</span></button></div>
        <Avatar :name="d.name" :hue="d.hue" :size="96" />
        <h2>{{ d.name }}</h2>
        <p>{{ d.specialty }} · {{ d.branch }}</p>
      </div>
      <div class="pad">
        <div class="stats lift" style="margin-top: -22px">
          <div><b>{{ d.years }}+</b><small>Years</small></div>
          <div><b>{{ d.rating }}</b><small>{{ d.reviews }} reviews</small></div>
          <div><b>{{ d.days.split(' ')[0] }}–{{ d.days.split(' ').at(-1) }}</b><small>Working days</small></div>
        </div>

        <div class="sec"><h4>About</h4></div>
        <p style="line-height: 1.55; color: #4a4a4a">{{ d.bio }}</p>

        <div class="sec"><h4>Treatments</h4></div>
        <div class="list">
          <button v-for="s in d.skills.map(service)" :key="s.name" class="li" @click="go('book', { doctorId: d.id, service: s.name })">
            <span class="ic sm"><span class="ms">{{ s.icon }}</span></span>
            <span class="grow"><b>{{ s.name }}</b><small>{{ s.mins }} min</small></span>
            <span class="price" style="font-size: 16px">{{ etb(s.price) }}</span>
          </button>
        </div>

        <div class="sec"><h4>Location & hours</h4></div>
        <div class="card row"><span class="ic"><span class="ms">location_on</span></span><div class="grow"><b style="font-weight: 500">{{ d.branch }}</b><div class="muted small">{{ d.days }} · 8:30 AM – 5:30 PM</div></div></div>
      </div>
    </div>
    <div class="foot">
      <button class="icon-btn boxed" style="width: 52px; height: 52px; border-radius: 16px" @click="chat">
        <span class="ms">{{ canChat(d.id) ? 'chat' : 'lock' }}</span>
      </button>
      <button class="btn" @click="go('book', { doctorId: d.id })"><span class="ms">calendar_add_on</span>Book appointment</button>
    </div>
  </div>
</template>
