<script setup>
import { state, go, reset } from '../store'
import AppBar from '../components/AppBar.vue'

// The real app reads the role from the account; the demo lets you pick.
function login(role) {
  state.role = role
  reset(role === 'student' ? 's-home' : 'home')
}
</script>

<template>
  <div class="scr">
    <AppBar title="" />
    <div class="body">
      <div class="center"><img src="/img/logo-white.png" class="auth-logo" alt="Lavish" /></div>
      <h2 class="center mt24" style="font-size: 30px">Welcome back</h2>
      <p class="center muted mt4">Log in to continue</p>
      <div class="field mt24"><label>Phone number</label><div class="input"><span class="pre">🇪🇹 +251</span><input value="911 22 33 44" inputmode="tel" /></div></div>
      <div class="field"><label>Password</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /><span class="ms">visibility</span></div></div>
      <p style="text-align: right"><a class="link small">Forgot password?</a></p>
      <button class="btn mt24" @click="login('client')">Log in</button>
      <button class="btn ghost mt12" @click="login('student')"><span class="ms">school</span>Demo: log in as student</button>
      <p class="center mt24 muted">New to Lavish? <a class="link" @click="go('welcome')">Create an account</a></p>
    </div>
  </div>
</template>
