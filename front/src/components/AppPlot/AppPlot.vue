<script lang="ts" setup="">
import {settingsStore} from 'src/components/Settings/settingsStore';
import {plotlyFontSizeRef} from 'src/hooks/useHeatmapLayout';
import {watch} from 'vue';

import {useAppPlot} from './useAppPlot';

export interface AppPlotProps {
  labels: string[][];
  values: number[][];
  names?: string[];
  colors?: string[][];
  title?: string;
  xTitle?: string;
  yTitle?: string;
  legend?: boolean;
  exportFilename: string;
}

const props = defineProps<AppPlotProps>();

const {divRef, refresh} = useAppPlot(props);

watch([props, settingsStore, plotlyFontSizeRef], refresh);
</script>

<template>
  <span
    ref="divRef"
    class="histogram"
  />
</template>

<style lang="scss" scoped>
.histogram {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
