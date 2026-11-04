<script setup>
import { computed } from 'vue'
import { state, go, doctor, fmtDate, SERVICES, ONLINE, etb } from '../store'
import Avatar from '../components/Avatar.vue'
import ProductArt from '../components/ProductArt.vue'

const next = computed(() => state.appointments.filter((a) => a.status === 'approved').sort((a, b) => a.date.localeCompare(b.date))[0])
const pending = computed(() => state.appointments.filter((a) => a.status === 'pending').length)
const rx = computed(() => state.prescriptions.find((r) => r.status === 'sent'))
const unread = computed(() => state.notifications.some((n) => n.unread))
const h = new Date().getHours()
const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
const actions = [
  { icon: 'calendar_add_on', label: 'Book', to: 'doctors' },
  { icon: 'shopping_bag', label: 'Shop', to: 'shop' },
  { icon: 'forum', label: 'Chat', to: 'chats' },
  { icon: 'support_agent', label: 'Complain', to: 'complaints' },
]
</script>

<template>
  <div class="scr">
    <div class="body flush">
      <div class="teal-head home-head">
        <div class="row">
          <Avatar :name="state.client.name" :size="46" :hue="28" />
          <div class="grow"><small class="hello">{{ greet }},</small><h2>{{ state.client.name.split(' ')[0] }}</h2></div>
          <button class="icon-btn on-dark" @click="go('notifications')"><span class="ms">notifications</span><i v-if="unread" class="dot"></i></button>
        </div>
        <button class="search on-dark mt16" @click="go('doctors')"><span class="ms">search</span>Search treatments or doctors</button>
      </div>

      <div class="pad">
        <div v-if="next" class="card next-card lift" @click="go('appointment', { id: next.id })">
          <div class="top">
            <div class="row between"><span class="label">Next appointment</span><span class="badge approved"><span class="ms" style="font-size: 13px">check</span>Confirmed</span></div>
            <h4>{{ next.service }}</h4>
            <div class="row"><Avatar :name="doctor(next.doctorId).name" :hue="doctor(next.doctorId).hue" :size="30" /><span>{{ doctor(next.doctorId).name }}</span></div>
          </div>
          <div class="bottom">
            <span><span class="ms">calendar_today</span>{{ fmtDate(next.date) }}</span>
            <span><span class="ms">schedule</span>{{ next.time }}</span>
            <span class="ellip"><span class="ms">{{ next.online ? 'videocam' : 'location_on' }}</span>{{ next.online ? 'Online' : next.branch.replace('Addis Ababa – ', '') }}</span>
          </div>
        </div>

        <button v-if="pending" class="banner warn mt12" style="width: 100%; text-align: left" @click="go('appointments', { tab: 'requests' })">
          <span class="ms">hourglass_top</span><span class="grow"><b>{{ pending }} request{{ pending > 1 ? 's' : '' }} waiting</b> for reception to approve</span><span class="ms">chevron_right</span>
        </button>

        <div class="tiles mt20">
          <button v-for="a in actions" :key="a.label" class="tile" @click="go(a.to)"><span class="ic"><span class="ms">{{ a.icon }}</span></span>{{ a.label }}</button>
        </div>

        <button class="promo teal-head mt20" style="width: 100%; text-align: left; padding: 18px" @click="go('book', { doctorId: null, online: true })">
          <span class="ic" style="background: rgba(255,255,255,.14); color: #fff; width: 52px; height: 52px; border-radius: 16px"><span class="ms" style="font-size: 28px">{{ ONLINE.icon }}</span></span>
          <span class="grow"><h4>See a doctor online</h4><p>{{ ONLINE.mins }}-min video consultation from home · {{ etb(ONLINE.price) }}</p></span>
          <span class="ms">chevron_right</span>
        </button>

        <button v-if="rx" class="card row mt20" style="width: 100%; text-align: left; background: var(--gold-soft); border-color: #ead8cc" @click="go('prescription', { id: rx.id })">
          <span class="ic gold" style="background: #fff"><span class="ms">medication</span></span>
          <span class="grow"><b style="font-weight: 500">New prescription</b><small class="muted" style="display: block">{{ doctor(rx.doctorId).name }} recommended {{ rx.items.length }} products</small></span>
          <span class="ms">chevron_right</span>
        </button>

        <div class="sec"><h4>News from Lavish</h4></div>
        <div class="hscroll">
          <button v-for="n in state.news" :key="n.id" class="card news-card" @click="go('news', { id: n.id })">
            <div class="news-art" :style="{ background: `linear-gradient(135deg, hsl(${n.hue} 40% 42%), hsl(${n.hue} 45% 26%))` }"><span class="ms">{{ n.icon }}</span><span class="badge">{{ n.tag }}</span></div>
            <b>{{ n.title }}</b>
            <small class="muted">{{ fmtDate(n.date) }}</small>
          </button>
        </div>

        <div class="sec"><h4>Our treatments</h4><a class="link" @click="go('doctors')">See all</a></div>
        <div class="hscroll">
          <button v-for="s in SERVICES.slice(0, 6)" :key="s.name" class="svc" @click="go('doctors', { service: s.name })">
            <span class="ic sm"><span class="ms">{{ s.icon }}</span></span>
            <b>{{ s.name }}</b><small>from {{ etb(s.price) }}</small>
          </button>
        </div>

        <div class="sec"><h4>Recommended for you</h4><a class="link" @click="go('shop')">Shop</a></div>
        <div class="hscroll">
          <button v-for="pr in state.products.filter((x) => x.stock).slice(0, 5)" :key="pr.id" class="mini-p" @click="go('product', { id: pr.id })">
            <ProductArt :product="pr" :h="120" />
            <b>{{ pr.name }}</b><span class="price" style="font-size: 16px">{{ etb(pr.price) }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
