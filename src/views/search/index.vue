<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- /搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell title="1" icon="search" />
      <van-cell title="2" icon="search" />
      <van-cell title="3" icon="search" />
      <van-cell title="4" icon="search" />
      <van-cell title="5" icon="search" />
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 搜索记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;&nbsp;
        <span>完成</span>&nbsp;&nbsp;&nbsp;
        <van-icon name="delete"/>
      </van-cell>
      <van-cell title="hello"><van-icon name="close" /></van-cell>
      <van-cell title="hello"><van-icon name="close" /></van-cell>
      <van-cell title="hello"><van-icon name="close" /></van-cell>
      <van-cell title="hello"><van-icon name="close" /></van-cell>
    </van-cell-group>
    <!-- /搜索记录 -->
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
</style>
