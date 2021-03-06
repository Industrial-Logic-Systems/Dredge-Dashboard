import {
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import moment from "moment";

const LineGraph = (props) => {
  const { x_axis, y_axis, data, min = "dataMin", max = "dataMax" } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          dataKey={x_axis}
          hide
          domain={[data.at(0).time, data.at(-1).time]}
          type="number"
        />
        <YAxis orientation={"right"} width={10} domain={[min, max]} />
        <Tooltip
          labelFormatter={(timeStr) =>
            moment.utc(timeStr).format("MMMM Do YYYY, h:mm:ss a")
          }
        />
        <Line dataKey={y_axis} type="monotone" stroke="black" dot={{ r: 1 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
