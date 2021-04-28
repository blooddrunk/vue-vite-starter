<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<route lang="yaml">
meta:
  layout: sidebar
  breadcrumb:
    text: 'Admin'
</route>
