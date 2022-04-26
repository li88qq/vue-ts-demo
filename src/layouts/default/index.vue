<template>
  <a-layout :class="prefixCls">
    <a-layout-header :class="`${prefixCls}-header`">
      <div class="header-logo"></div>
    </a-layout-header>
    <a-layout :class="`${prefixCls}-parent`">
      <a-layout-sider :class="`${prefixCls}-sider`" collapsible>
        <a-menu
            mode="inline"
            theme="dark"
        >
          <template v-for="item in menus" :key="item.key">
            <template v-if="!item.children">
              <a-menu-item :key="item.key">
                <template #icon v-if="item.icon">
                  <Icon :icon="item.icon"></Icon>
                </template>
                {{ item.title }}
              </a-menu-item>
            </template>
            <template v-else>
              <sub-menu :key="item.key" :menu-info="item"/>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout :class="`${prefixCls}-main`">
        <router-view></router-view>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {computed} from 'vue'

import {SubMenu} from '/@/components/subMenu'
import Icon from '/@/components/icon/index.vue'

import {menus} from './data'

const namespace = 'vue'

const useDesign = (scoped: string) => {
  const prefixCls = `${namespace}-${scoped}`
  return {
    prefixCls,
  }
}


const {prefixCls} = useDesign('layout')

</script>
<style scoped lang="less">
@prefix-cls: ~'@{app-namespace}-layout';
@header-height: 64px;

.@{prefix-cls} {
  min-height: 100%;
}


</style>