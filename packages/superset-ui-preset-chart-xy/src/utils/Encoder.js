import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { get } from 'lodash/fp';
import { scaleOrdinal } from 'd3-scale';

export default class Encoder {
  constructor(spec, data) {
    const { encoding } = spec;
    this.encoding = encoding;
    this.accessors = {};
    this.scales = {};
    this.axes = {};
    this.legends = [];

    Object.keys(encoding).forEach(key => {
      if (key === 'x') {
        const { accessor, axis, scale } = this.parseXOrY('x');
        this.accessors.x = accessor;
        this.axes.x = axis;
        this.scales.x = scale;
      } else if (key === 'y') {
        const { accessor, axis, scale } = this.parseXOrY('y');
        this.accessors.y = accessor;
        this.axes.y = axis;
        this.scales.y = scale;
      } else if (key === 'color') {
        const { accessor, scale } = this.parseCategory('color');
        this.accessors.color = accessor;
        this.scales.color = scale;
      } else if (key === 'fill') {
        const { accessor, scale } = this.parseCategory('fill');
        this.accessors.fill = accessor;
        this.scales.fill = scale;
      } else if (key === 'strokeDasharray') {
        const { accessor, scale } = this.parseCategory('strokeDasharray');
        this.accessors.strokeDasharray = accessor;
        this.scales.strokeDasharray = scale;
      }
    });
  }

  encode(datum, field, defaultValue = null) {
    const accessor = this.accessors[field];
    if (accessor) {
      const scale = this.scales[field];
      const value = accessor(datum);

      return scale ? scale(value) : value;
    }

    return defaultValue;
  }

  parseXOrY(field) {
    let axis;
    let scale;
    const e = this.encoding[field];

    if (e.axis) {
      axis = { ...e.axis };
      const { tickFormat } = axis;
      if (tickFormat) {
        axis.tickFormat = this.parseTickFormat(e.type, tickFormat);
      }
    }

    return {
      accessor: this.parseAccessor(e),
      axis,
      scale,
    };
  }

  parseTickFormat(fieldType, tickFormat) {
    switch (fieldType) {
      case 'quantitative':
        return getNumberFormatter(tickFormat);
      case 'temporal':
        return getTimeFormatter(tickFormat);
      default:
        return null;
    }
  }

  parseAccessor(encoding) {
    const { value, field } = encoding;
    if (value) {
      return () => value;
    }

    return get(field);
  }

  parseCategory(field) {
    let scale = x => x;
    const e = this.encoding[field];

    const { type, legend } = e;
    if (type === 'nominal' && e.scale !== false) {
      scale = scaleOrdinal();
      if (e.scale) {
        const { domain, range, scheme, namespace } = e.scale;
        if (domain) {
          scale.domain(domain);
        }
        if (range) {
          scale.range(range);
        } else {
          scale = CategoricalColorNamespace.getScale(scheme, namespace);
        }
        if (type !== 'value' && legend !== false && legend !== null) {
          this.legends.push(field);
        }
      }
    }

    return {
      accessor: this.parseAccessor(e),
      scale,
    };
  }
}
