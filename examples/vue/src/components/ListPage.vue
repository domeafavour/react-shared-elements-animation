<script setup lang="ts">
import { ref } from 'vue';
import Item from './Item.vue';
const items = ref(
  Array.from({ length: 20 }, (_, index) => (index + 1).toString())
);
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item">
        <Item :id="item" />
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  cursor: pointer;
}
</style>
