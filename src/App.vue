<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Phone from './components/Phone.vue'
import { SCREENS, FLOWS } from './screens'
import { state, reset, back } from './store'

const mode = ref('proto')
const current = computed(() => state.stack.at(-1))
const items = FLOWS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.group })))
const same = (a, b) => JSON.stringify(a ?? {}) === JSON.stringify(b ?? {})
const info = computed(() =>
  items.find((i) => i.s === current.value.name && same(i.params, current.value.params)) ??
  items.find((i) => i.s === current.value.name))
const labelOf = (e) => (items.find((i) => i.s === e.name && same(i.params, e.params)) ?? items.find((i) => i.s === e.name))?.label ?? e.name

function open(item) {
  const def = SCREENS[item.s]
  if (def.role) state.role = def.role
  const root = def.tab || !def.role ? null : def.role === 'student' ? 's-home' : 'home'
  const entry = { name: item.s, params: item.params ?? {} }
  state.stack = root ? [{ name: root, params: {} }, entry] : [entry]
  mode.value = 'proto'
}
function switchRole(r) { state.role = r; reset(r === 'student' ? 's-home' : 'home') }

const scale = ref(1)
const fit = () => (scale.value = Math.min(1, (window.innerHeight - 40) / 864))
// Deep links: #gallery opens the overview, #<screen> (e.g. #shop) opens that screen.
function fromHash() {
  const h = decodeURIComponent(location.hash.slice(1))
  if (h === 'gallery') mode.value = 'gallery'
  else if (h) { const i = items.find((x) => x.s === h); if (i) open(i) }
}
onMounted(() => { fit(); fromHash(); window.addEventListener('resize', fit) })
onUnmounted(() => window.removeEventListener('resize', fit))

const TOKENS = [['#0a7379', 'Teal (primary)'], ['#06565b', 'Teal deep'], ['#cba590', 'Gold (accent)'], ['#f3e8e1', 'Gold soft'], ['#d9e8e5', 'Mint'], ['#f6f5f4', 'Background'], ['#262626', 'Ink (text)'], ['#808285', 'Muted text']]
</script>

<template>
  <div class="desk" :class="{ gal: mode === 'gallery' }">
    <aside class="flows">
      <div class="brand"><img src="/img/logo-white.png" alt="Lavish" /><div><b>Mobile app</b><small>DESIGN PROTOTYPE · v0.1</small></div></div>
      <div class="dseg">
        <button :class="{ on: mode === 'proto' }" @click="mode = 'proto'"><span class="ms">smartphone</span>Prototype</button>
        <button :class="{ on: mode === 'gallery' }" @click="mode = 'gallery'"><span class="ms">grid_view</span>All screens</button>
      </div>
      <div class="dseg">
        <button :class="{ on: state.role === 'client' }" @click="switchRole('client')"><span class="ms">spa</span>Client</button>
        <button :class="{ on: state.role === 'student' }" @click="switchRole('student')"><span class="ms">school</span>Student</button>
      </div>
      <template v-for="g in FLOWS" :key="g.group">
        <h5>{{ g.group }}</h5>
        <nav>
          <button v-for="i in g.items" :key="i.label" :class="{ on: mode === 'proto' && info === items.find((x) => x.label === i.label && x.group === g.group) }" @click="open(i)">
            <span class="ms">{{ g.icon }}</span>{{ i.label }}
          </button>
        </nav>
      </template>
    </aside>

    <main v-if="mode === 'proto'" class="stage">
      <div class="tools">
        <button v-if="state.stack.length > 1" @click="back"><span class="ms">arrow_back</span>Back</button>
        <button @click="reset('splash')"><span class="ms">restart_alt</span>Restart</button>
      </div>
      <div class="fit" :style="{ transform: `scale(${scale})` }"><Phone :entry="current" live /></div>
    </main>

    <main v-else class="gallery">
      <h1>All screens</h1>
      <p>{{ items.length }} screens across the client and student apps. Click any screen to open it in the clickable prototype.</p>
      <template v-for="g in FLOWS" :key="g.group">
        <h3>{{ g.group }}</h3>
        <div class="gal-grid">
          <div v-for="i in g.items" :key="i.label" class="thumb" @click="open(i)">
            <div class="frame"><Phone :entry="{ name: i.s, params: i.params ?? {} }" /></div>
            <p>{{ i.label }}</p>
          </div>
        </div>
      </template>
    </main>

    <aside v-if="mode === 'proto'" class="notes">
      <template v-if="info">
        <div class="grp">{{ info.group }}</div>
        <h2>{{ info.label }}</h2>
        <p>{{ info.note }}</p>
        <template v-if="info.web">
          <h6>Connects to the web app</h6>
          <div class="web"><span class="ms">desktop_windows</span><span>{{ info.web }}</span></div>
        </template>
      </template>

      <h6>Navigation stack</h6>
      <div class="crumbs"><span v-for="(e, i) in state.stack" :key="i">{{ labelOf(e) }}</span></div>

      <h6>Design tokens (same as web)</h6>
      <div class="tokens"><div v-for="[c, n] in TOKENS" :key="c"><i :style="{ background: c }"></i><span>{{ n }}<br /><code>{{ c }}</code></span></div></div>

      <h6>Notes for Flutter</h6>
      <p class="small" style="font-size: 12.5px">
        Headings: <b>EB Garamond</b> 600 · Body: <b>Roboto</b> (+ Noto Sans Ethiopic for Amharic).<br />
        Icons are <b>Material Symbols Rounded</b> — the names match Flutter's <code>Icons.xxx_rounded</code>.<br />
        Cards 20 radius · buttons 16 · inputs 14 · screen padding 20.<br />
        Bottom tabs = <code>NavigationBar</code> (Material 3). Screen = <code>Scaffold</code> + <code>AppBar</code>.
      </p>
    </aside>
  </div>
</template>
