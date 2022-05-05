<template>
  <div class="page-view">
    <div class="page-sider page-card">
      <slot name="sider"></slot>
    </div>
    <div class="page-main">
      <div class="page-action page-card">
        <a-space>
          <slot name="action"></slot>
        </a-space>
      </div>
      <div class="page-search page-card">
        <slot name="search"></slot>
      </div>
      <div class="page-table page-card">
        <slot name="table"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="less">
.page-card {
  background-color: #fff;
  padding: 6px 12px;
  border: 1px solid #eee;
}

.page-view {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}

.page-sider{
  margin: 12px 0 12px 12px;
  min-width: 200px;
  max-width: 400px;
  overflow: auto;
  resize: horizontal;
}

.page-main{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 12px;
}

.page-action{
  margin-bottom: 6px;
}
.page-search{
  margin-bottom: 6px;
}

.page-table{
  flex: 1;
}

</style>