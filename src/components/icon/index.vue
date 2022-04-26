<template>
  <Icon :icon="icon"></Icon>
</template>

<script setup lang="ts">
import {Icon} from '@iconify/vue'

defineProps({
  icon: {
    type: String,
  },
})
</script>