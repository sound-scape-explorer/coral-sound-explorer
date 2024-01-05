import {reactive} from 'vue';

export type ColorType = 'cycleDay';

export interface ColorsStore {
  colorType: ColorType;
  colorScale: string;
}

export const colorsStore = reactive<ColorsStore>({
  colorType: 'cycleDay',
  colorScale: 'Dark2',
});
