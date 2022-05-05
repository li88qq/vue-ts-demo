<template>
  <PageView>
    <template #sider></template>
    <template #action>
      <a-button type="primary" @click="addAc">新增</a-button>
    </template>
    <template #search>
      <Search v-bind="formRt"></Search>
    </template>
    <template #table>
      <a-table v-bind="tableRt"></a-table>
    </template>
  </PageView>
</template>

<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import {PageView, Search} from '/@/components/page'
import {formItems, initColumns,} from './data'
import {useTable} from '/@/hooks/web/useTable'

const {tableRt} = useTable({
  opt: {
    columns: initColumns,
  }
})

const formRt = reactive({
  items: formItems,
})

const addAc = () => {

}

const initMock = () => {

}

onMounted(() => {
  initMock()
})
</script>