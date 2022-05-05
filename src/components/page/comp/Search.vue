<template>
  <a-form :model="formRt" :label-col="{span:8}" :wrapper-col="{span:16}">
    <a-row :gutter="16">
      <template v-for="(item,index) in props.items">
        <a-col :span="6" v-show="expandRef||index<4">
          <a-form-item v-bind="item.props">
            <template v-if="item.type==='Input'">
              <a-input/>
            </template>
            <template v-else-if="item.type==='Select'">
              <a-select/>
            </template>
          </a-form-item>
        </a-col>
      </template>
      <a-col :span="6" :offset="compOffset" class="page-search-action">
        <a-space>
          <a-button type="link" v-if="props.items.length>4" @click="expandAc">展开</a-button>
          <a-button type="primary">查询</a-button>
          <a-button type="default">清空</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import {reactive, ref, computed, toRaw,} from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: {}
  },
  items: {
    type: Array,
    default: []
  }
})


const formRt = reactive({})
const expandRef = ref(false)
const expandAc = () => {
  expandRef.value = !expandRef.value
}
const compOffset = computed(() => {
  const length = toRaw(props.items).length;
  if (length > 4) {
    return 18;
  }
  return (3 - length % 4) * 6;
})
</script>
<style scoped lang="less">
.page-search-action {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

::v-deep(.ant-form-item-label) {
  background-color: #eee;
}

::v-deep(.ant-form-item) {
  margin-bottom: 6px;
}
</style>