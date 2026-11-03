<script setup>
import { reset, notify } from '../store'
import AppBar from '../components/AppBar.vue'

// First student login: replace the temporary password the CEO handed over.
function save() {
  reset('s-home')
  notify('Password saved — welcome to the academy!')
}
</script>

<template>
  <div class="scr">
    <AppBar title="" />
    <div class="body">
      <div class="burst" style="width: 80px; height: 80px; margin: 0 auto"><span class="ms" style="font-size: 38px">key</span></div>
      <h2 class="center mt16" style="font-size: 30px">Choose your password</h2>
      <p class="center muted mt8">You logged in with a temporary password from the academy. Set your own to keep your account safe.</p>
      <div class="field mt24"><label>New password</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /><span class="ms">visibility</span></div></div>
      <div class="field"><label>Confirm new password</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /></div></div>
    </div>
    <div class="foot col"><button class="btn" @click="save">Save & continue</button></div>
  </div>
</template>
