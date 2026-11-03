<script setup>
import { ref } from 'vue'
import { go, BRANCHES } from '../store'
import AppBar from '../components/AppBar.vue'

// Clients only — student accounts are created by the academy (CEO) in the web app.
const gender = ref('Female')
</script>

<template>
  <div class="scr">
    <AppBar title="Create account" sub="It takes less than a minute" />
    <div class="body">
      <div class="field mt8"><label>Full name</label><div class="input"><span class="ms">person</span><input placeholder="e.g. Tigist Worku" /></div></div>
      <div class="field"><label>Phone number</label><div class="input"><span class="pre">🇪🇹 +251</span><input placeholder="9X XXX XXXX" inputmode="tel" /></div></div>
      <div class="field"><label>Email (optional)</label><div class="input"><span class="ms">mail</span><input placeholder="you@example.com" /></div></div>
      <div class="field"><label>Gender</label>
        <div class="seg"><button v-for="g in ['Female', 'Male']" :key="g" :class="{ on: gender === g }" @click="gender = g">{{ g }}</button></div>
      </div>
      <div class="field"><label>Preferred branch</label><div class="input"><span class="ms">location_on</span><select><option v-for="b in BRANCHES" :key="b">{{ b }}</option></select></div></div>
      <div class="field"><label>Password</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /><span class="ms">visibility</span></div></div>
      <label class="check"><span class="box"><span class="ms">check</span></span>I agree to Lavish's Terms of Service and Privacy Policy, including how my medical information is stored.</label>
      <p class="center small muted mt16">Academy student? <a class="link" @click="go('login', { role: 'student' })">Log in with your student account</a></p>
    </div>
    <div class="foot col">
      <button class="btn" @click="go('otp', { role: 'client' })">Create account</button>
    </div>
  </div>
</template>
