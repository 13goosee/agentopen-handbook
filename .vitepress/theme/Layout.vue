<script setup>
import DefaultTheme from 'vitepress/theme'
import RouteSelector from './RouteSelector.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <RouteSelector />
    </template>
  </Layout>
</template>
