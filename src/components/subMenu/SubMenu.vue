<template>
  <a-sub-menu :key="menuInfo.id">
    <template #icon v-if="menuInfo.icon">
      <Icon :icon="menuInfo.icon"></Icon>
    </template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.id">
      <template v-if="!item.children">
        <a-menu-item :key="item.id">
          <template #icon v-if="item.icon">
            <Icon :icon="item.icon"></Icon>
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.id"/>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
import Icon from '/@/components/icon/index.vue'
import {MenuInfo} from "/@/components/subMenu/type";

defineProps({
  menuInfo: {
    type: Object as PropType<MenuInfo>
  }
})
</script>