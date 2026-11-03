<script setup>
import { state, go, reset, ACADEMY_PHONE } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const student = p.params.role === 'student'

// The real app reads the role from the account; the demo lets you pick.
// A student's first login uses the temporary password from the academy, so they set their own.
function login(role) {
  state.role = role
  if (role === 'student' && student) return go('set-password')
  reset(role === 'student' ? 's-home' : 'home')
}
</script>

<template>
  <div class="scr">
    <AppBar title="" />
    <div class="body">
      <div class="center"><img src="/img/logo-white.png" class="auth-logo" alt="Lavish" /></div>
      <h2 class="center mt24" style="font-size: 30px">{{ student ? 'Student login' : 'Welcome back' }}</h2>
      <p class="center muted mt4">{{ student ? 'Use the login the academy gave you' : 'Log in to continue' }}</p>
      <div class="field mt24"><label>Phone number</label><div class="input"><span class="pre">🇪🇹 +251</span><input :value="student ? '914 88 21 07' : '911 22 33 44'" inputmode="tel" /></div></div>
      <div class="field"><label>{{ student ? 'Password from the academy' : 'Password' }}</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /><span class="ms">visibility</span></div></div>
      <template v-if="student">
        <button class="btn mt24" @click="login('student')">Log in</button>
        <div class="banner mt16"><span class="ms">info</span><span>Student accounts are created by the academy. To enrol, or if you forgot your password, visit the academy or call <a class="link" :href="'tel:' + ACADEMY_PHONE.replace(/ /g, '')">{{ ACADEMY_PHONE }}</a>.</span></div>
        <p class="center mt24 muted">Not a student? <a class="link" @click="go('login')">Client log in</a></p>
      </template>
      <template v-else>
        <p style="text-align: right"><a class="link small">Forgot password?</a></p>
        <button class="btn mt24" @click="login('client')">Log in</button>
        <button class="btn ghost mt12" @click="login('student')"><span class="ms">school</span>Demo: log in as student</button>
        <p class="center mt24 muted">New to Lavish? <a class="link" @click="go('register')">Create an account</a></p>
      </template>
    </div>
  </div>
</template>
