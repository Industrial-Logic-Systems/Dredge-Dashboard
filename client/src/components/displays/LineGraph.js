import {
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const LineGraph = (props) => {
  const { x_axis, y_axis, data } = props;

  return (
    <>
      <ResponsiveContainer aspect={3}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey={x_axis} interval={"preserveStartEnd"}></XAxis>
          <YAxis />
          <Tooltip />
          <Line dataKey={y_axis} type="monotone" stroke="black" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraph;
