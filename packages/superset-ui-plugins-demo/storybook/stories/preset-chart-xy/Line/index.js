import { LineChartPlugin as LegacyLineChartPlugin } from '../../../../../superset-ui-preset-chart-xy/src/legacy';
import { LineChartPlugin } from '../../../../../superset-ui-preset-chart-xy/src';
import Stories from './Stories';
import LegacyStories from './LegacyStories';

new LegacyLineChartPlugin().configure({ key: 'v2-line/legacy' }).register();
new LineChartPlugin().configure({ key: 'v2-line' }).register();

export default {
  examples: [...Stories, ...LegacyStories],
};
