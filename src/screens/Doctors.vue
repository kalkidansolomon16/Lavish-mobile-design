<script setup>
import { ref, computed } from 'vue'
import { state, go, slug } from '../store'
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'

const p = defineProps({ params: Object })
const service = ref(p.params.service || '')
const spec = ref('All')
const q = ref('')
const specs = ['All', ...new Set(state.doctors.map((d) => d.specialty))]
const list = computed(() => state.doctors.filter((d) =>
  (spec.value === 'All' || d.specialty === spec.value) &&
  (!service.value || d.skills.includes(service.value)) &&
  d.name.toLowerCase().includes(q.value.toLowerCase())))
</script>

<template>
  <div class="scr">
    <AppBar title="Doctors" root />
    <div class="body">
      <label class="search"><span class="ms">search</span><input v-model="q" placeholder="Search by doctor name" /></label>
      <div class="chips mt12"><button v-for="s in specs" :key="s" class="chip" :class="{ on: spec === s }" @click="spec = s">{{ s }}</button></div>

      <div v-if="service" class="banner mt12"><span class="ms">filter_alt</span><span class="grow">Doctors who offer <b>{{ service }}</b></span><a class="link" @click="service = ''">Clear</a></div>

      <button class="card row mt16" style="width: 100%; text-align: left; border-style: dashed" @click="go('book', { doctorId: null, service })">
        <span class="ic gold"><span class="ms">auto_awesome</span></span>
        <span class="grow"><b style="font-weight: 500">Not sure who to see?</b><small class="muted" style="display: block">Book a treatment and reception will match you with the best available doctor.</small></span>
        <span class="ms muted">chevron_right</span>
      </button>

      <div class="stack mt16">
        <div v-for="d in list" :key="d.id" class="card doc-card" @click="go('doctor', { id: d.id })">
          <Avatar :name="d.name" :hue="d.hue" :size="62" :online="d.status === 'Available'" />
          <div class="grow">
            <div class="row between"><b style="font-weight: 500; font-size: 15px">{{ d.name }}</b></div>
            <div class="muted small">{{ d.specialty }}</div>
            <div class="meta mt8">
              <span><span class="ms star">star</span>{{ d.rating }} ({{ d.reviews }})</span>
              <span><span class="ms">location_on</span>{{ d.branch.replace('Addis Ababa – ', '') }}</span>
            </div>
            <div class="row between mt8"><span class="badge" :class="slug(d.status)">{{ d.status }}</span><button class="btn sm" @click.stop="go('book', { doctorId: d.id, service })">Book</button></div>
          </div>
        </div>
        <div v-if="!list.length" class="empty"><span class="ms">person_search</span><h4>No doctors found</h4><p>Try another specialty.</p></div>
      </div>
    </div>
  </div>
</template>
