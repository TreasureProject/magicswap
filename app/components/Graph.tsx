import { curveBasis } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useId, useMemo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";

import type { TimeInterval } from "~/types";

type GraphDataPoint = {
  x: number;
  y: number;
};

type Gradient = {
  from: string;
  to: string;
};

export const Graph = ({
  data,
  width,
  height,
  gradient,
}: {
  data: GraphDataPoint[];
  gradient: Gradient;
  width: number;
  height: number;
}) => {
  const id = useId();
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [
          Math.min(data[0].x, data[data.length - 1].x),
          Math.max(data[0].x, data[data.length - 1].x),
        ],
        range: [10, width - 10],
      }),
    [data, width]
  );

  const yScale = useMemo(() => {
    const y = data.map((el) => el.y);
    return scaleLinear<number>({
      // eslint-disable-next-line prefer-spread
      domain: [Math.max.apply(Math, y), Math.min.apply(Math, y)],
      range: [10, height - 10],
    });
  }, [data, height]);

  return (
    <div className="h-full w-full">
      <svg width={width} height={height}>
        <LinearGradient
          id={`gradient-${id}`}
          from={gradient.from}
          to={gradient.to}
          vertical={false}
          gradientUnits="userSpaceOnUse"
        />
        <LinePath
          data={data}
          curve={curveBasis}
          x={(d) => xScale(d.x) ?? 0}
          y={(d) => yScale(d.y) ?? 0}
          stroke={`url('#gradient-${id}')`}
        />
      </svg>
    </div>
  );
};

export const LineGraph = ({
  data,
  gradient,
}: {
  data: GraphDataPoint[];
  gradient: Gradient;
}) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <Graph width={width} height={height} data={data} gradient={gradient} />
      )}
    </AutoSizer>
  );
};

export const TimeIntervalLineGraph = ({
  data,
  ...rest
}: {
  data: TimeInterval[];
  gradient: Gradient;
}) => {
  return (
    <LineGraph
      {...rest}
      data={data.map(({ date, value }) => ({ x: date, y: value }))}
    />
  );
};
