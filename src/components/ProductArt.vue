<script setup>
// Placeholder product shot (tinted backdrop + bottle). Replace with real product photos from the admin panel.
defineProps({ product: Object, h: { type: Number, default: 140 } })
</script>

<template>
  <div class="art" :style="{ height: h + 'px', background: `linear-gradient(160deg, hsl(${product.hue} 45% 93%), hsl(${product.hue} 32% 80%))` }">
    <div class="b" :style="{ '--c': `hsl(${product.hue} 38% 45%)` }"><em :style="{ fontSize: h * 0.15 + 'px' }">L</em></div>
    <span v-if="product.stock === 0" class="oos">Out of stock</span>
  </div>
</template>
