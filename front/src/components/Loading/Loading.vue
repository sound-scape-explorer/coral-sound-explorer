<script lang="ts" setup>
import {NAlert} from 'naive-ui';

import AppModal from '../AppModal/AppModal.vue';
import {
  scatterLoadingRef,
  scatterLoadingTextRef,
} from '../Scatter/useScatterLoading';
</script>

<template>
  <AppModal
    v-if="scatterLoadingRef.value"
    :is-wait="true"
  >
    <n-alert
      type="info"
      class="loading"
    >
      <div>Loading...</div>
      <span>{{ scatterLoadingTextRef.value }}</span>
    </n-alert>
  </AppModal>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 16rem;
}
</style>
