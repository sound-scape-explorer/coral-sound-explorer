import chroma from 'chroma-js';
import type {Config, Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {
  LOWER_DECILE_SUFFIX,
  PLOTLY_SIZE,
  UPPER_DECILE_SUFFIX,
} from 'src/constants';
import {plotlyFontSizeRef} from 'src/hooks/useHeatmapLayout';
import {usePlotConfig} from 'src/hooks/usePlotConfig';
import type {PlotlyFill} from 'src/types';
import {ref, watch} from 'vue';

import {settingsStore} from '../Settings/settingsStore';
import type {AppPlotProps} from './AppPlot.vue';

export function useAppPlot(props: AppPlotProps) {
  const divRef = ref<HTMLDivElement | null>(null);
  const dataRef = ref<Data[] | null>(null);
  const layoutRef = ref<Partial<Layout> | null>(null);
  const configRef = ref<Partial<Config> | null>(null);
  const {generateConfig} = usePlotConfig(props.exportFilename);

  async function render() {
    if (
      divRef.value === null ||
      dataRef.value === null ||
      layoutRef.value === null ||
      configRef.value === null
    ) {
      return;
    }

    await Plotly.newPlot(
      divRef.value,
      dataRef.value,
      layoutRef.value,
      configRef.value,
    );
  }

  const generateData = (): Data[] => {
    const l = props.values.length;
    const data: Data[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const name = props.names?.[i] || '';
      const isLowerDecile = name.endsWith(LOWER_DECILE_SUFFIX);
      const isUpperDecile = name.endsWith(UPPER_DECILE_SUFFIX);

      let fill: PlotlyFill = undefined;
      let color: string = props.colors[i];
      let hoverinfo: 'all' | 'none' = 'all';
      let hovertemplate: string | undefined = undefined;
      let showlegend = true;

      if (props.hoverTemplate === 'default') {
        hovertemplate = '%{y:.3f}<extra>%{x}</extra>';
      } else if (props.hoverTemplate === 'relative-trajectories') {
        hovertemplate = `%{y:.3f}<extra>${name}<br>at %{x:.3f}</extra>`;
      }

      if (isLowerDecile) {
        color = 'transparent';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      } else if (isUpperDecile) {
        color = 'transparent';
        fill = 'tonexty';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      }

      data[i] = {
        type: 'scatter',
        mode: 'lines',
        name: name,
        x: props.labels[i],
        y: props.values[i],
        hovertemplate: hovertemplate,
        hoverinfo: hoverinfo,
        fill: fill,
        showlegend: showlegend,
        fillcolor: `rgba(${chroma(props.colors[i])
          .brighten()
          .alpha(0.33)
          .rgba()
          .join(',')})`,
        marker: {
          color: color,
          size: 6,
        },
      };
    }

    return data;
  };

  function refresh() {
    dataRef.value = generateData();

    layoutRef.value = {
      title: props.title,
      plot_bgcolor: settingsStore.plotBackground,
      paper_bgcolor: settingsStore.plotBackground,
      showlegend: !!props.legend,
      clickmode: 'none',
      width: PLOTLY_SIZE,
      height: PLOTLY_SIZE,
      font: {
        size: Number(plotlyFontSizeRef.value),
      },
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 1,
      },
      xaxis: {
        title: props.xTitle,
      },
      yaxis: {
        title: props.yTitle,
      },
      legend: {
        xanchor: 'right',
        yanchor: 'top',
        x: 1,
        y: 1,
      },
    };

    configRef.value = generateConfig();
  }

  refresh();
  watch([divRef, dataRef, layoutRef], render);

  return {
    divRef: divRef,
    render: render,
    refresh: refresh,
  };
}
