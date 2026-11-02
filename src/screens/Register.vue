<script setup>
import { ref } from 'vue'
import { state, go, BRANCHES } from '../store'
import AppBar from '../components/AppBar.vue'

const p = defineProps({ params: Object })
const role = ref(p.params.role || 'client')
const gender = ref('Female')
</script>

<template>
  <div class="scr">
    <AppBar title="Create account" sub="It takes less than a minute" />
    <div class="body">
      <div class="seg">
        <button :class="{ on: role === 'client' }" @click="role = 'client'"><span class="ms">spa</span>Client</button>
        <button :class="{ on: role === 'student' }" @click="role = 'student'"><span class="ms">school</span>Student</button>
      </div>

      <div class="field mt20"><label>Full name</label><div class="input"><span class="ms">person</span><input placeholder="e.g. Tigist Worku" /></div></div>
      <div class="field"><label>Phone number</label><div class="input"><span class="pre">🇪🇹 +251</span><input placeholder="9X XXX XXXX" inputmode="tel" /></div></div>
      <div class="field"><label>Email (optional)</label><div class="input"><span class="ms">mail</span><input placeholder="you@example.com" /></div></div>

      <template v-if="role === 'client'">
        <div class="field"><label>Gender</label>
          <div class="seg"><button v-for="g in ['Female', 'Male']" :key="g" :class="{ on: gender === g }" @click="gender = g">{{ g }}</button></div>
        </div>
        <div class="field"><label>Preferred branch</label><div class="input"><span class="ms">location_on</span><select><option v-for="b in BRANCHES" :key="b">{{ b }}</option></select></div></div>
      </template>
      <template v-else>
        <div class="field"><label>Course you're interested in</label><div class="input"><span class="ms">menu_book</span><select><option v-for="c in state.courses" :key="c.id">{{ c.title }}</option></select></div></div>
        <div class="field"><label>Education level</label><div class="input"><span class="ms">workspace_premium</span><select><option>Diploma</option><option>Bachelor's degree</option><option>Nursing / medical licence</option><option>High school</option></select></div></div>
      </template>

      <div class="field"><label>Password</label><div class="input"><span class="ms">lock</span><input type="password" value="password" /><span class="ms">visibility</span></div></div>
      <label class="check"><span class="box"><span class="ms">check</span></span>I agree to Lavish's Terms of Service and Privacy Policy, including how my medical information is stored.</label>
    </div>
    <div class="foot col">
      <button class="btn" @click="go('otp', { role })">Create account</button>
    </div>
  </div>
</template>
