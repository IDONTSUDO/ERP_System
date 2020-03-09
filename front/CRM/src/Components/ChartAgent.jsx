import React, { Component } from "react";
import { ResponsivePieCanvas } from "@nivo/pie";

export default class ChartAgent extends Component {
  constructor() {
    super();
    this.state = {};
  }
  PieAgent = data => {
    return ({ data /* see data tab */ }) => (
      <ResponsivePieCanvas
        data={data}
        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
        pixelRatio={1}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "paired" }}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: "ruby"
            },
            id: "dots"
          },
          {
            match: {
              id: "c"
            },
            id: "dots"
          },
          {
            match: {
              id: "go"
            },
            id: "dots"
          },
          {
            match: {
              id: "python"
            },
            id: "dots"
          },
          {
            match: {
              id: "scala"
            },
            id: "lines"
          },
          {
            match: {
              id: "lisp"
            },
            id: "lines"
          },
          {
            match: {
              id: "elixir"
            },
            id: "lines"
          },
          {
            match: {
              id: "javascript"
            },
            id: "lines"
          }
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            translateX: 140,
            itemWidth: 60,
            itemHeight: 14,
            itemsSpacing: 2,
            symbolSize: 14,
            symbolShape: "circle"
          }
        ]}
      />
    );
  };
  render() {
    let data = [
      {
        id: "make",
        label: "make",
        value: 47,
        color: "hsl(167, 70%, 50%)"
      },
      {
        id: "stylus",
        label: "stylus",
        value: 133,
        color: "hsl(213, 70%, 50%)"
      },
      {
        id: "lisp",
        label: "lisp",
        value: 4,
        color: "hsl(260, 70%, 50%)"
      },
      {
        id: "ruby",
        label: "ruby",
        value: 277,
        color: "hsl(217, 70%, 50%)"
      },
      {
        id: "c",
        label: "c",
        value: 150,
        color: "hsl(297, 70%, 50%)"
      }
    ];
    return (
      <div>
        <div style={{width:"500px",height:"500px"}}>{this.PieAgent(data)}</div>
      </div>
    );
  }
}
