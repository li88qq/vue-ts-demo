<template>
  <a-form ref="formRef" :model="formRt" :label-col="{span:8}" :wrapper-col="{span:16}">
    <a-row :gutter="16">
      <template v-for="(item,index) in props.items">
        <a-col :span="6" v-show="expandRef||index<4">
          <a-form-item v-bind="item.props">
            <component :is="`A${item.type}`" v-bind="item.bind" v-model:value="formRt[item.props.name]" allowClear>
            </component>
          </a-form-item>
        </a-col>
      </template>
      <a-col :span="6" :offset="compOffset" class="page-search-action">
        <a-space>
          <a-button type="link" v-if="props.items.length>4" @click="expandAc">展开</a-button>
          <a-button type="primary" @click="searchAc">查询</a-button>
          <a-button type="default" @click="clearAc">清空</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import {reactive, ref, unref, computed, toRaw, onMounted} from 'vue'

//form对象字段
interface Form {
  [index: string]: any
}

//formItem属性
interface FormItems {
  type: string,
  props: {
    name: string,
    [index: string]: any,
  },
  bind?: {
    [index: string]: any,
  },
}

const props = defineProps<{
  form?: Object,
  items: FormItems[],
}>()

const emits = defineEmits(['search'])

//form引用
const formRef = ref()
//form绑定对象
const formRt = reactive<Form>({})
//展开
const expandRef = ref(false)
//展开操作
const expandAc = () => {
  expandRef.value = !expandRef.value
}
//计算操作偏移量
const compOffset = computed(() => {
  const length = toRaw(props.items).length;
  if (length > 4) {
    return 18;
  }
  return (3 - length % 4) * 6;
})

//清空form
const clearAc = () => {
  formRef.value.resetFields();
}
//搜索
const searchAc = () => {
  emits('search')
}

//初始化
const initForm = () => {
  const formItems = unref(props.items)
  formItems.forEach(item => {
    //补充属性
    if (item.type === 'Select' && item.bind) {
      item.bind['placeholder'] = '全部'
    }
    formRt[item.props.name] = undefined
  })
}

onMounted(() => {
  initForm();
})

defineExpose({
  formRef,
  formRt,
  clearAc,

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