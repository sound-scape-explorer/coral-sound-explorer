<script lang="ts" setup="">
import {settingsStore} from 'src/components/Settings/settingsStore';
import {plotlyFontSizeRef} from 'src/hooks/useHeatmapLayout';
import {watch} from 'vue';

import {useAppPlot} from './useAppPlot';

export interface AppPlotProps {
  labels: string[][];
  values: number[][];
  names?: string[];
  colors: string[];
  title?: string;
  xTitle?: string;
  yTitle?: string;
  legend?: boolean;
  exportFilename: string;
  hoverTemplate?: 'default' | 'relative-trajectories';
}

const props = withDefaults(defineProps<AppPlotProps>(), {
  hoverTemplate: 'default',
});

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
  align-items: center;
  justify-content: center;
}
</style>
