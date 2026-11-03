<script setup>
import { state, reset, notify } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const digits = ['4', '8', '2', '7', '', '']
function verify() {
  state.role = 'client'
  reset('home')
  notify('Welcome to Lavish!')
}
</script>

<template>
  <div class="scr">
    <AppBar title="" />
    <div class="body center">
      <div class="burst" style="width: 80px; height: 80px"><span class="ms" style="font-size: 38px">sms</span></div>
      <h2 style="font-size: 30px">Verify your phone</h2>
      <p class="muted mt8">Enter the 6-digit code we sent by SMS to<br /><b style="color: var(--ink)">+251 911 22 33 44</b></p>
      <div class="otp mt24"><input v-for="(d, i) in digits" :key="i" :value="d" maxlength="1" inputmode="numeric" /></div>
      <p class="muted small mt24">Didn't get it? Resend code in <b style="color: var(--ink)">0:42</b></p>
    </div>
    <div class="foot col"><button class="btn" @click="verify">Verify & continue</button></div>
  </div>
</template>
