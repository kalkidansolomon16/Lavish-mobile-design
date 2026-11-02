<script setup>
// Used for client ↔ doctor (key = doctorId) and student ↔ teacher doctor (key = 'teacher').
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { state, go, back, doctor, canChat, notify, actions, fmtDate } from '../store'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const key = p.params.key ?? (state.role === 'student' ? 'teacher' : 1)
const isTeacher = key === 'teacher'
const d = doctor(isTeacher ? 1 : key)
const who = isTeacher ? { name: d.name, sub: 'Your teacher · Foundations', hue: d.hue } : { name: d.name, sub: d.specialty, hue: d.hue }
const root = isTeacher && state.role === 'student'
const locked = !isTeacher && !canChat(key)
const done = state.appointments.find((a) => a.doctorId === key && a.status === 'completed')
const msgs = computed(() => state.chats[key] ?? [])
const text = ref('')
const box = ref(null)

function send() {
  if (!text.value.trim()) return
  actions.sendChat(key, text.value.trim())
  text.value = ''
}
const scroll = () => nextTick(() => box.value && (box.value.scrollTop = box.value.scrollHeight))
watch(() => [msgs.value.length, state.typing], scroll)
onMounted(scroll)
</script>

<template>
  <div class="scr">
    <header class="appbar white">
      <button v-if="!root" class="icon-btn" @click="back"><span class="ms">arrow_back</span></button>
      <div class="row grow" :style="{ paddingLeft: root ? '8px' : 0 }">
        <Avatar :name="who.name" :hue="who.hue" :size="40" :online="!locked" />
        <div class="grow"><b style="font-weight: 500; font-size: 15px">{{ who.name }}</b><small>{{ state.typing === key ? 'typing…' : locked ? who.sub : 'Online · ' + who.sub }}</small></div>
      </div>
      <button v-if="!locked" class="icon-btn"><span class="ms">call</span></button>
      <button v-if="!isTeacher" class="icon-btn" @click="go('doctor', { id: d.id })"><span class="ms">info</span></button>
    </header>

    <template v-if="locked">
      <div class="body center" style="padding-top: 60px">
        <div class="burst" style="background: #efeeec; color: var(--muted); box-shadow: 0 0 0 12px rgba(239,238,236,.6)"><span class="ms">lock</span></div>
        <h2 style="font-size: 26px">Chat is locked</h2>
        <p class="muted mt8" style="line-height: 1.5">You can message {{ who.name }} after your first treatment with them. This keeps doctor chat for real follow-up care.</p>
        <button class="btn mt24" @click="go('book', { doctorId: key })"><span class="ms">calendar_add_on</span>Book a treatment</button>
      </div>
    </template>

    <template v-else>
      <div ref="box" class="body flush">
        <div v-if="done" class="banner gold chat-ctx"><span class="ms">spa</span><span>After your <b>{{ done.service }}</b> on {{ fmtDate(done.date) }}</span></div>
        <div v-if="isTeacher" class="banner chat-ctx"><span class="ms">school</span><span>Ask your teacher about lessons, exercises and practicals. Fees and certificates are handled by the General Manager.</span></div>
        <div class="msgs">
          <span class="day-sep">Earlier</span>
          <template v-for="(m, i) in msgs" :key="i">
            <div class="bubble" :class="{ me: m.from === 'me' }">{{ m.text }}<small>{{ m.time }}</small></div>
            <div v-if="!isTeacher && i === 1 && m.from === 'me'" class="bubble me img"><div class="ph"><span class="ms" style="font-size: 34px">image</span></div><small style="padding: 0 6px 4px">Photo · {{ m.time }}</small></div>
          </template>
          <div v-if="state.typing === key" class="typing"><i></i><i></i><i></i></div>
        </div>
      </div>
      <form class="composer" @submit.prevent="send">
        <button type="button" class="icon-btn" @click="notify('Opens camera / gallery to share a photo')"><span class="ms">add_photo_alternate</span></button>
        <input v-model="text" placeholder="Write a message…" />
        <button class="send"><span class="ms f">send</span></button>
      </form>
    </template>
  </div>
</template>
