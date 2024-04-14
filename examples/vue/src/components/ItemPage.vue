<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTitleSharedAnimationHelper } from '../hooks/useTitleSharedAnimationHelper';

const route = useRoute();
const id = route.params.id;

const [nodeRef, { fromSnapshot, makeSnapshot }] = useTitleSharedAnimationHelper(
  id as string
);

onMounted(fromSnapshot);
onBeforeUnmount(makeSnapshot);
</script>

<template>
  <div ref="nodeRef" class="title">{{ id }}</div>
</template>
<style scoped>
.title {
  font-size: 56px;
  font-weight: 800;
}
</style>
