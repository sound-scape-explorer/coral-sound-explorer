<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import SelectionMenu from './SelectionMenu.vue';
import SelectionUnload from './SelectionUnload.vue';
</script>

<template>
  <AppDraggable draggable-key="selection">
    <div class="container">
      <SelectionMenu />
      <SelectionUnload />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 24rem;
}
</style>
