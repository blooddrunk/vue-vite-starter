<template>
  <el-tabs
    class="tw-mb-4"
    :value="currentActiveTab"
    :closable="canRemoveNavTab"
    type="border-card"
    @input="handleChange"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="item in currentNavTabList"
      :key="item.route"
      :label="item.text"
      :name="item.route"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup></script>
