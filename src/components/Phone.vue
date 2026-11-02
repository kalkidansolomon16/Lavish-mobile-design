<script setup>
// iPhone-sized frame (390 × 844). `live` = interactive prototype; otherwise a static gallery thumbnail.
import { computed, provide } from 'vue'
import { SCREENS, TABS } from '../screens'
import { state, reset, cartCount } from '../store'

const p = defineProps({ entry: Object, live: Boolean })
provide('live', p.live)
const def = computed(() => SCREENS[p.entry.name])
const tabs = computed(() => (def.value.tab ? TABS[def.value.role] : null))
const key = computed(() => p.entry.name + JSON.stringify(p.entry.params ?? {}))
</script>

<template>
  <div class="phone" :class="{ live }">
    <div class="scrn">
      <div class="island"></div>
      <div class="status" :class="{ light: def.light }">
        <span>9:41</span>
        <span class="icons"><span class="ms f">signal_cellular_alt</span><span class="ms f">wifi</span><span class="ms f">battery_full</span></span>
      </div>
      <div class="view">
        <transition :name="live ? 'fade' : ''" appear>
          <component :is="def.c" :key="key" :params="entry.params ?? {}" />
        </transition>
      </div>
      <nav v-if="tabs" class="tabbar">
        <button v-for="t in tabs" :key="t.key" :class="{ on: def.tab === t.key }" @click="reset(t.key)">
          <span class="ms">{{ t.icon }}</span>{{ t.label }}
          <i v-if="t.key === 'shop' && cartCount()" class="count">{{ cartCount() }}</i>
        </button>
      </nav>
      <div class="homebar" :class="{ light: def.dark }"></div>
      <transition name="toast">
        <div v-if="live && state.toast" class="toast"><span class="ms f">check_circle</span>{{ state.toast }}</div>
      </transition>
    </div>
  </div>
</template>
