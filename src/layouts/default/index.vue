<template>
  <a-layout :class="prefixCls">
    <a-layout-header :class="`${prefixCls}-header`">
      <div class="header-logo"></div>
    </a-layout-header>
    <a-layout :class="`${prefixCls}-parent`">
      <a-layout-sider :class="`${prefixCls}-sider`" collapsible>
        <a-menu v-bind="menuRt">
          <template v-for="item in menus" :key="item.id">
            <template v-if="!item.children">
              <a-menu-item :key="item.id">
                <template #icon v-if="item.icon">
                  <Icon :icon="item.icon"></Icon>
                </template>
                {{ item.title }}
              </a-menu-item>
            </template>
            <template v-else>
              <sub-menu :key="item.id" :menu-info="item"/>
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
import {computed, reactive,} from 'vue'

import {SubMenu} from '/@/components/subMenu'
import Icon from '/@/components/icon/index.vue'

import {menus} from './data'
import {router} from '/@/router'

const namespace = 'vue'

const useDesign = (scoped: string) => {
  const prefixCls = `${namespace}-${scoped}`
  return {
    prefixCls,
  }
}

const {prefixCls} = useDesign('layout')

const menuRt = reactive({
  mode: 'inline',
  theme: 'dark',
  selectedKeys: [menus[0].id],
  openKeys: [menus[0].id],
  rootSubmenuKeys: menus.map(item => item.id),
  onOpenChange: (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => menuRt.openKeys.indexOf(key) === -1);
    if (menuRt.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      menuRt.openKeys = openKeys;
    } else {
      menuRt.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  },
  onSelect: ({key = '', selectedKeys = ['']}) => {
    menuRt.selectedKeys = selectedKeys
    //判断外层
    const parentMenu = menus.filter(item => item.id.substring(0, 2) === key.substring(0, 2))[0]
    const menu = parentMenu.children ? parentMenu.children.filter(m => m.id === key)[0] : parentMenu
    //处理展开
    if (parentMenu.children) {
      menuRt.openKeys = [parentMenu.id, menu.id]
    } else {
      menuRt.openKeys = [menu.id]
    }
    router.push({path: menu.url})
  }
})


</script>
<style scoped lang="less">
@prefix-cls: ~'@{app-namespace}-layout';
@header-height: 64px;

.@{prefix-cls} {
  min-height: 100%;
}


</style>