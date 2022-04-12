import { curveBasis } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { useMemo } from "react";
import { useId } from "@reach/auto-id";
import AutoSizer from "react-virtualized-auto-sizer";

export const Graph = ({
  data,
  width,
  height,
  gradient,
}: {
  data: {
    x: number;
    y: number;
  }[];
  width: number;
  height: number;
  gradient: {
    from: string;
    to: string;
  };
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
      domain: [Math.max.apply(Math, y), Math.min.apply(Math, y)],
      range: [10, height - 10],
    });
  }, [data, height]);

  return (
    <div className="w-full h-full">
      <svg width={width} height={height}>
        <LinearGradient
          id={`gradient-${id}`}
          from={gradient.from}
          to={gradient.to}
          vertical={false}
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
  data: {
    x: number;
    y: number;
  }[];
  gradient: {
    from: string;
    to: string;
  };
}) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <Graph width={width} height={height} data={data} gradient={gradient} />
      )}
    </AutoSizer>
  );
};
