<script lang="ts" setup>
import {NButton} from 'naive-ui';
import {useStorageFile} from 'src/hooks/useStorageFile';
import {ref} from 'vue';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import ImportDetails from './ImportDetails.vue';
import {importLockRef} from './useImportLock';

const inputRef = ref<HTMLInputElement>();
const {setFile, isStorageFileRef, resetFile} = useStorageFile();

const handleChange = () => {
  const file = inputRef.value?.files?.[0];

  if (typeof file === 'undefined') {
    return;
  }

  setFile(file);
};
</script>

<template>
  <AppDraggable draggable-key="import">
    <div class="container">
      <input
        ref="inputRef"
        type="file"
        accept=".h5"
        @change="handleChange"
        :disabled="importLockRef.value"
      />
      <n-button
        class="red"
        size="small"
        @click="resetFile"
        :disabled="!importLockRef.value"
      >
        Unload
      </n-button>
    </div>

    <ImportDetails v-if="isStorageFileRef" />
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 8rem;

  gap: 1rem;
}

.red {
  background: rgba(255, 0, 0, 0.2);
}

.green {
  background: rgba(0, 255, 0, 0.2);
}
</style>
