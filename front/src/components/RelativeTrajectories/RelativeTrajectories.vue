<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import chroma from 'chroma-js';
import {NButton, NCascader, NIcon} from 'naive-ui';
import {Csv} from 'src/common/Csv';
import AppDraggable from 'src/components/AppDraggable/AppDraggable.vue';
import AppPlot, {type AppPlotProps} from 'src/components/AppPlot/AppPlot.vue';
import {scatterLoadingRef} from 'src/components/Scatter/useScatterLoading';
import {
  EXPORT_FILENAME,
  LOWER_DECILE_SUFFIX,
  RELATIVE_TRAJECTORIES_FLAVOR,
  UPPER_DECILE_SUFFIX,
} from 'src/constants';
import {
  relativeTrajectoriesRef,
  useRelativeTrajectories,
} from 'src/hooks/useRelativeTrajectories';
import {computed, ref} from 'vue';

const {selectRelativeTrajectories} = useRelativeTrajectories();

const valueRef = ref([]);

const optionsRef = computed(() => {
  if (relativeTrajectoriesRef.value === null) {
    return [];
  }

  return relativeTrajectoriesRef.value.map((rT) => ({
    label: rT.name,
    value: rT.index,
  }));
});

const histogramValuesRef = ref<AppPlotProps['values']>([]);
const histogramLabelsRef = ref<AppPlotProps['labels']>([]);
const histogramNamesRef = ref<string[]>([]);
const histogramColors = ref<string[]>([]);

const handleUpdateValue = (indexes: number[]) => {
  const selected = selectRelativeTrajectories(indexes);

  if (selected.length === 0) {
    histogramValuesRef.value = [];
    histogramLabelsRef.value = [];
    histogramNamesRef.value = [];
    return;
  }

  const names: string[] = [];
  const labels: string[][] = []; // timestamps
  const values: number[][] = []; // series
  const colors: string[] = [];
  const s = chroma.scale(RELATIVE_TRAJECTORIES_FLAVOR).colors(selected.length);

  for (let i = 0; i < selected.length; i += 1) {
    const {name, timestamps, deciles, values: v} = selected[i];
    const color = s[i];
    const ts = timestamps.map((t) => t.toString());

    names.push(name);
    labels.push(ts);
    values.push(v);
    colors.push(color);

    if (deciles === null) {
      continue;
    }

    names.push(`${name}${LOWER_DECILE_SUFFIX}`);
    labels.push(ts);
    values.push(deciles.map((q) => q[0]));
    colors.push(color);

    names.push(`${name}${UPPER_DECILE_SUFFIX}`);
    labels.push(ts);
    values.push(deciles.map((q) => q[1]));
    colors.push(color);
  }

  histogramNamesRef.value = names;
  histogramLabelsRef.value = labels;
  histogramValuesRef.value = values;
  histogramColors.value = colors;
};

const handleExportClick = () => {
  if (
    histogramValuesRef.value.length === 0 ||
    histogramLabelsRef.value.length === 0 ||
    histogramNamesRef.value.length === 0 ||
    typeof histogramNamesRef?.value === 'undefined'
  ) {
    return;
  }

  const csv = new Csv();

  const maxLength = histogramValuesRef.value
    .map((values) => values.length)
    .reduce((a, b) => Math.max(a, b), 0);

  // create time column
  csv.addColumn('relative time');

  // create columns
  for (const name of histogramNamesRef.value) {
    csv.addColumn(name);
  }

  // create rows
  for (let i = 0; i < maxLength; i += 1) {
    const time = histogramLabelsRef.value[0][i];
    let row: string[] = [time];

    for (const j in histogramNamesRef.value) {
      const distance = histogramValuesRef.value[j][i] as unknown as
        | string
        | undefined;
      let payload = '';

      if (distance !== undefined) {
        payload = distance.toString();
      }

      row = [...row, payload];
    }

    csv.createRow();
    csv.addToCurrentRow(row.join(csv.separator));
  }

  csv.download(`${EXPORT_FILENAME}-relative-trajectories`);
};
</script>

<template>
  <AppDraggable draggable-key="relativeTrajectories">
    <div class="container">
      <n-cascader
        v-model:value="valueRef"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="scatterLoadingRef.value"
        :filterable="false"
        :options="optionsRef"
        :show-path="false"
        check-strategy="child"
        clearable
        expand-trigger="click"
        max-tag-count="responsive"
        multiple
        placeholder="Select relative trajectories"
        size="small"
        @update:value="handleUpdateValue"
      />

      <n-button
        class="export"
        size="tiny"
        @click="handleExportClick"
      >
        <template #icon>
          <n-icon>
            <download-outline />
          </n-icon>
        </template>
        Export .csv
      </n-button>

      <AppPlot
        :colors="histogramColors"
        :labels="histogramLabelsRef"
        :names="histogramNamesRef"
        :values="histogramValuesRef"
        export-filename="relative-trajectories"
        legend
        title="Relative Trajectories"
        xTitle="Relative daytime"
        yTitle="Relative distance from average starting point"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  min-width: 20rem;

  gap: 0.5rem;
}

.export {
  width: 100%;
}
</style>
