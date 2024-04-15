<script setup lang="ts">
import { onMounted } from 'vue';
import { useTitleSharedAnimationHelper } from '../hooks/useTitleSharedAnimationHelper';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const [nodeRef, { fromSnapshot, makeSnapshot }] = useTitleSharedAnimationHelper(
  props.id
);

onMounted(fromSnapshot);
</script>

<template>
  <RouterLink :to="`/item/${props.id}`">
    <div class="item" @click="() => makeSnapshot()">
      <span class="text" ref="nodeRef">{{ props.id }}</span>
    </div>
  </RouterLink>
</template>
<style scoped>
a {
  text-decoration: none;
}
.item {
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  overflow: visible;
  padding: 2em;

  &:hover {
    background-color: #f9f9f9;
  }
}
.text {
  display: inline-block;
  font-size: 24px;
  font-weight: 800;
  color: #333;
}
</style>
