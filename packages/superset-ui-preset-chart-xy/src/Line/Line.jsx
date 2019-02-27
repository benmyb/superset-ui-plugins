/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable sort-keys, no-magic-numbers, complexity */
import PropTypes from 'prop-types';
import React from 'react';
import {
  AreaSeries,
  LinearGradient,
  LineSeries,
  XYChart,
  CrossHair,
  WithTooltip,
} from '@data-ui/xy-chart';
import { themeShape } from '@data-ui/xy-chart/esm/utils/propShapes';
import { chartTheme } from '@data-ui/theme';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { flatMap, get, uniqueId } from 'lodash';
import createTooltip from './createTooltip';
import renderLegend from '../utils/renderLegend';
import XYChartLayout from '../utils/XYChartLayout';
import WithLegend from '../components/WithLegend';

chartTheme.gridStyles.stroke = '#f1f3f5';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }),
  encoding: PropTypes.shape({
    x: PropTypes.object,
    y: PropTypes.object,
    color: PropTypes.object,
  }).isRequired,
  theme: themeShape,
};

const defaultProps = {
  className: '',
  margin: { top: 20, right: 20, left: 20, bottom: 20 },
  theme: chartTheme,
};

class LineChart extends React.PureComponent {
  renderChart({ width, height }) {
    const { data, encoding, margin, theme } = this.props;

    const spec = {
      width,
      height,
      minContentWidth: 0,
      minContentHeight: 0,
      margin,
      theme,
      encoding,
    };

    const colorFn = CategoricalColorNamespace.getScale(
      encoding.color.scale.scheme,
      encoding.color.scale.namespace,
    );

    const encodedData = data.map(series => {
      const color = colorFn(get(series, encoding.color.field));

      return {
        ...series,
        color,
        fill: series.fields.name === 'David',
        values: series.values.map(v => ({
          ...v,
          color,
        })),
      };
    });

    const children = flatMap(
      encodedData
        .filter(series => series.fill)
        .map(series => {
          const gradientId = uniqueId(`gradient-${series.seriesKey}`);

          return [
            <LinearGradient
              key={`${series.seriesKey}-gradient`}
              id={gradientId}
              from={series.color}
              to="#fff"
            />,
            <AreaSeries
              key={`${series.seriesKey}-fill`}
              data={series.values}
              fill={`url(#${gradientId})`}
              stroke={series.color}
            />,
          ];
        }),
    ).concat(
      encodedData.map(series => (
        <LineSeries
          key={series.seriesKey}
          seriesKey={series.seriesKey}
          animated
          data={series.values}
          stroke={series.color}
          strokeDasharray={series.strokeDasharray}
          strokeWidth={1.5}
        />
      )),
    );

    const layout = new XYChartLayout({ ...spec, children });

    return layout.createChartWithFrame(dim => (
      <WithTooltip renderTooltip={createTooltip(spec, encodedData)}>
        {({ onMouseLeave, onMouseMove, tooltipData }) => (
          <XYChart
            width={dim.width}
            height={dim.height}
            ariaLabel="BoxPlot"
            margin={layout.margin}
            eventTrigger="container"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            renderTooltip={null}
            showYGrid
            snapTooltipToDataX
            theme={spec.theme}
            tooltipData={tooltipData}
            xScale={spec.encoding.x.scale}
            yScale={spec.encoding.y.scale}
          >
            {children}
            {layout.createXAxis()}
            {layout.createYAxis()}
            <CrossHair
              fullHeight
              strokeDasharray=""
              showHorizontalLine={false}
              circleFill={d => (d.y === tooltipData.datum.y ? d.color : '#fff')}
              circleSize={d => (d.y === tooltipData.datum.y ? 6 : 4)}
              circleStroke={d => (d.y === tooltipData.datum.y ? '#fff' : d.color)}
              circleStyles={{ strokeWidth: 1.5 }}
              stroke="#ccc"
              showCircle
              showMultipleCircles
            />
          </XYChart>
        )}
      </WithTooltip>
    ));
  }

  render() {
    const { className, data, width, height, encoding } = this.props;

    return (
      <WithLegend
        className={`superset-chart-line ${className}`}
        width={width}
        height={height}
        position="top"
        renderLegend={() => renderLegend(data, encoding.color)}
        renderChart={parent => this.renderChart(parent)}
        hideLegend={!encoding.color.legend}
      />
    );
  }
}

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
