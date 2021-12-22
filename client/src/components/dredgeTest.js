import React, { useEffect, useState } from "react";
import Map from "./displays/Map";
//import LineGraph from "./displays/LineGraph";
import { useDispatch, useSelector } from "react-redux";
import { getDredge } from "../redux/ducks/dredgeSlice";
import TrendLineDisplay from "./displays/TrendLineDisplay";

const DredgeTest = () => {
  const DREDGE_NAME = "Dredge ILS";
  const dispatch = useDispatch();
  const dredge = useSelector((state) => state.dredge);

  const [positions, setPositions] = useState([[0, 0]]);
  const [trendGraphs, setTrendGraphs] = useState([]);

  useEffect(() => {
    dispatch(getDredge({ name: DREDGE_NAME, limit: 50 }));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Updating");
      dispatch(getDredge({ name: DREDGE_NAME, limit: 50 }));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (dredge.data.constructor === Array) {
      const positions = dredge.data.map((data) => [
        data.ch_latitude,
        data.ch_longitude,
      ]);
      positions.reverse();
      setPositions(positions);

      const graphData = dredge.data.map((data) => {
        return {
          time: data.msg_time,
          vert: data.vert_correction,
          depth: data.ch_depth,
          slurry_velocity: data.slurry_velocity,
          slurry_density: data.slurry_density,
          vacuum: data.vacuum,
        };
      });
      graphData.reverse();
      setTrendGraphs(graphData);
    }
  }, [dredge.data]);

  return (
    <div>
      <h1>Dredge Test</h1>
      <TrendLineDisplay
        name={"Vacuum"}
        data={trendGraphs}
        x_axis={"time"}
        y_axis={"vacuum"}
        suffix={"IWC"}
      />
      <TrendLineDisplay
        name={"Slurry Density"}
        data={trendGraphs}
        x_axis={"time"}
        y_axis={"slurry_density"}
        suffix={"sg"}
      />
      <TrendLineDisplay
        name={"Slurry Velocity"}
        data={trendGraphs}
        x_axis={"time"}
        y_axis={"slurry_velocity"}
        suffix={"Ft/s"}
      />
      <TrendLineDisplay
        name={"Vertical Correction"}
        data={trendGraphs}
        x_axis={"time"}
        y_axis={"vert"}
        suffix={"Ft"}
      />
      <TrendLineDisplay
        name={"Depth"}
        data={trendGraphs}
        x_axis={"time"}
        y_axis={"depth"}
        suffix={"Ft"}
      />
      <Map positions={positions} />
    </div>
  );
};

export default DredgeTest;
