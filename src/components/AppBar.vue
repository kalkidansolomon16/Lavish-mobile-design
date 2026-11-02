<script setup>
import { back } from '../store'
defineProps({ title: String, sub: String, root: Boolean, white: Boolean })
</script>

<template>
  <header class="appbar" :class="{ root, white }">
    <button v-if="!root" class="icon-btn" @click="back"><span class="ms">arrow_back</span></button>
    <div class="t"><h3>{{ title }}</h3><small v-if="sub">{{ sub }}</small></div>
    <div class="actions"><slot /></div>
  </header>
</template>
