<template>
  <div class="page-view">
    <div class="page-sider page-card">
      <template v-for="(item,index) in logsRef" :key="index">
        <p>{{ item }}</p>
      </template>
    </div>
    <div class="page-main">
      <div class="page-action page-card">
        <a-space>
          <a-button type="primary" @click="addColumnsAc(1)">新增列</a-button>
          <a-button type="primary" @click="addColumnsAc(5)">新增5列</a-button>
          <a-button type="primary" danger @click="addColumnsAc(-1)">删除列</a-button>
          <a-button type="primary" @click="addRowsAc(1)">新增行</a-button>
          <a-button type="primary" @click="addRowsAc(5)">新增5行</a-button>
          <a-button type="primary" danger @click="addRowsAc(-1)">删除行</a-button>
          <a-button type="primary" danger @click="resetAc">重置</a-button>
        </a-space>
      </div>
      <div class="page-search page-card" :style="{height:expandRef?'400px':'50px'}">
        <a-space>
          <a-button type="primary" @click="expandAc">{{ expandRef ? "折叠" : "展开" }}</a-button>
          <a-button type="primary" @click="cleanLogAc" danger>清空日记</a-button>
        </a-space>
      </div>
      <div class="page-table page-card" ref="tableWrapRef">
        <a-table v-bind="tableRt" ref="tableRef"></a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//滚动条
interface Scroll {
  x: number | string,
  y: number | string,
}

//列数据
interface Column {
  key?: number | string,
  dataIndex: string,
  title: string,
  align?: string,
  ellipsis?: boolean,
  width?: number,
  fixed?: string,
}

import {onMounted, reactive, ref, unref, watch} from "vue";

//展开
const expandRef = ref(false)
//展开操作
const expandAc = () => {
  expandRef.value = !expandRef.value
  log(expandRef.value ? '折叠!' : '展开!')
}

//列默认宽度
const defaultWidth = 150;
//表格勾选框宽度
const defaultSelectWidth = 60;

//列数
const columnsRef = ref(0)
//行数
const rowsRef = ref(0)
//表格引用
const tableRef = ref()
//表格数据
const tableRt = reactive({
  columns: [],
  dataSource: [],
  size: 'middle',
  bordered: true,
  rowKey: 'column_0',
  pagination: {
    showSizeChanger: true,
    defaultPageSize: 15,
    pageSizeOptions: ['5', '15', '30', '50', '100'],
  },
  rowSelection: {
    columnWidth: defaultSelectWidth,
    fixed: true,
  },
  scroll: <Scroll>{
    x: '100%',
    y: '100%',
  },
})

//日记
const logsRef = ref<string[]>([])
//日记序号
const logIndexRef = ref(0)

//添加列
const addColumnsAc = (value: number) => {
  const v = columnsRef.value + value;
  if (v >= 0) {
    columnsRef.value = v;
    log(`columns:${columnsRef.value}  [${value}]`)
  }
}
//添加行
const addRowsAc = (value: number) => {
  const v = rowsRef.value + value;
  if (v >= 0) {
    rowsRef.value = v;
    log(`rows:${rowsRef.value}  [${value}]`)
  }
}
//重置行列
const resetAc = () => {
  columnsRef.value = 0;
  rowsRef.value = 0;
  log(`数据已重置!`)
}
//清空日记
const cleanLogAc = () => {
  logsRef.value = [];
  logIndexRef.value = 0;
}

//日记
const log = (msg: string) => {
  logsRef.value.unshift(`[${logIndexRef.value++}]=>:${msg}`)
}

//动态生成行列数据
watch([columnsRef, rowsRef], () => {
  const columns = unref(columnsRef)
  const rows = unref(rowsRef)

  const colArr: Column[] = []
  const rowArr = []

  for (let i = 0; i < columns; i++) {
    const col = `column_${i}`
    const colObject = {
      dataIndex: col,
      title: col,
      align: 'center',
      ellipsis: true,
      width: defaultWidth,
    }
    colArr.push(colObject)
  }

  if (columns >= 5) {
    colArr[0].fixed = 'left'
    colArr[columns - 1].fixed = 'right'
  }

  tableRt.columns = colArr as any

  for (let i = 0; i < rows; i++) {
    const row: any = {}
    colArr.forEach(col => {
      row[col.dataIndex] = col.dataIndex;
    })
    rowArr.push(row)
  }

  tableRt.dataSource = rowArr as any
  log('表格数据变化!')
})

//全局变量,监听对象
let resizeObserver: ResizeObserver | undefined = undefined;
//表格外层容器引用
const tableWrapRef = ref()
//表格外层容器宽高
const tableWrapRt = reactive({
  width: 0,
  height: 0,
})

const initResizeObserver = () => {
  resizeObserver = new ResizeObserver(async entries => {
    let width = 0;
    let height = 0;
    const entry = entries[0]
    if (entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
      width = contentBoxSize.inlineSize
      height = contentBoxSize.blockSize;
    } else {
      width = entry.contentRect.width
      height = entry.contentRect.height
    }

    width = Math.ceil(width)
    height = Math.ceil(height)

    tableWrapRt.width = width
    tableWrapRt.height = height;

    log(`监听到表格容器变化!x:${width},y:${height}`)
  });
  resizeObserver.observe(tableWrapRef.value)
}

//处理x滚动条,1.列数,2.可用宽度
watch([columnsRef, tableWrapRt], () => {
  const x = unref(tableWrapRt.width)
  const totalWidth = defaultSelectWidth + unref(columnsRef) * defaultWidth
  log(`调整滚动条x!表格数据宽度:${totalWidth},可用宽度:${x}`)
  if (totalWidth > x) {
    tableRt.scroll.x = x;
  } else {
    tableRt.scroll.x = '100%';
  }
  log(`调整滚动条!x调整为:${tableRt.scroll.x}`)

  const y = unref(tableWrapRt.height)
  redoHeight(y)
})

const redoHeight = (y: number) => {
  //调整高度
  let titleHeight = 0;
  let headHeight = 0;
  let paginationHeight = 0;

  const tableDom = unref(tableRef);
  if (!tableDom) {
    return;
  }
  const tableEl = tableDom.$el;
  if (!tableEl) {
    return;
  }
  const bodyEl = tableEl.querySelector('.ant-table-body');
  if (!bodyEl) {
    return;
  }

  const headEl = tableEl.querySelector('.ant-table-thead ');
  if (headEl) {
    headHeight = headEl.offsetHeight;
  }
  const paginationEl = tableEl.querySelector('.ant-pagination');
  if (paginationEl) {
    paginationHeight += paginationEl.offsetHeight + 32;
  } else {
    paginationHeight = 56;
  }

  let bodyHeight = y - titleHeight - headHeight - paginationHeight
  if (bodyHeight <= 0) {
    log(`调整滚动条!body高度已小于等于0!`)
    bodyHeight = y;
  }
  log(`调整滚动条!y调整为:${bodyHeight},可用高度为:${y},head:${headHeight},pageHeight:${paginationHeight}`)
  bodyEl.style.height = bodyHeight + 'px'
  tableRt.scroll.y = bodyHeight;
}

onMounted(() => {
  initResizeObserver();
})

</script>
<style scoped lang="less">
.page-card {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #eee;
}

.page-view {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 64px);
  //background-color: #999;
  overflow: auto;
}

.page-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 12px;
  overflow: auto;
}

.page-sider {
  margin: 12px 0 12px 12px;
  min-width: 300px;
  max-width: 500px;
  overflow: auto;
  resize: horizontal;
}

.page-action {
  margin-bottom: 6px;
}

.page-search {
  margin-bottom: 6px;
}

.page-table {
  flex: 1;
  overflow: hidden;
}
</style>