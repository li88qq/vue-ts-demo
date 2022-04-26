<template>
  <a-row class="nav-main">
    <template v-for="item in navigation" :key="item.name">
      <a-col :span="4" class="nav">
        <a-button type="link" :title="item.remark">
          <template #icon v-if="item.icon">
            <img :src="item.icon"/>
          </template>
          {{ item.title }}
        </a-button>
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
import {navigation} from './data'
</script>
<style scoped lang="less">
.nav-main {
  border: 1px solid #eee;
  background-color: #fff;
  margin: 24px;
}

.nav {
  margin-bottom: 12px;

  img {
    max-height: 20px;
    width: auto;
    margin-right: 8px;
  }
}
</style>