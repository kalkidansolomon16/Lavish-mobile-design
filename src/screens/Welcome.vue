<script setup>
import { go } from '../store'
</script>

<template>
  <div class="scr">
    <div class="teal-head w-hero">
      <div class="row between"><img src="/img/logo-white.png" class="w-logo" alt="Lavish" /><button class="lang">EN · አማ</button></div>
      <h1>Beauty, care<br />& learning —<br /><em>in your pocket.</em></h1>
      <p>Book treatments with our doctors, shop aftercare and grow your career with Lavish Academy.</p>
    </div>
    <div class="body">
      <p class="label mt16">How will you use Lavish?</p>
      <button class="role-card" @click="go('register', { role: 'client' })">
        <div class="ic"><span class="ms">spa</span></div>
        <div class="grow"><b>I'm a client</b><small>Book appointments, shop products & chat with your doctor</small></div>
        <span class="ms muted">chevron_right</span>
      </button>
      <button class="role-card" @click="go('register', { role: 'student' })">
        <div class="ic gold"><span class="ms">school</span></div>
        <div class="grow"><b>I'm a student</b><small>Apply for Lavish Academy courses & talk to the academy team</small></div>
        <span class="ms muted">chevron_right</span>
      </button>
      <p class="center mt24 muted">Already have an account? <a class="link" @click="go('login')">Log in</a></p>
    </div>
  </div>
</template>
