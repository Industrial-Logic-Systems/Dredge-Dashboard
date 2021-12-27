import React, { useEffect, useState } from "react";
import Map from "./displays/Map";
import { useDispatch, useSelector } from "react-redux";
import { getDredge } from "../redux/ducks/dredgeSlice";
import TrendLineDisplay from "./displays/TrendLineDisplay";
import MessageListBox from "./displays/MessageListBox";

const DredgeTest = () => {
  const DREDGE_NAME = "Dredge ILS";
  const dispatch = useDispatch();
  const dredge = useSelector((state) => state.dredge);

  const [positions, setPositions] = useState([[0, 0]]);
  const [trendGraphs, setTrendGraphs] = useState([]);
  const [nonEff, setNonEff] = useState([]);

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
          time: Date.parse(data.msg_time),
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

  useEffect(() => {
    if (dredge.non_eff.constructor === Array) {
      const nonEffData = dredge.non_eff.map((non_eff) => {
        return {
          sTime: Date.parse(non_eff.msgStart),
          eTime: Date.parse(non_eff.msgEnd),
          fCode: non_eff.function_code,
          msg: non_eff.message,
          id: non_eff.id,
        };
      });
      nonEffData.reverse();
      setNonEff(nonEffData);
    }
  }, [dredge.non_eff]);

  return (
    <div>
      <h1>Dredge Test</h1>
      <div className="row">
        <div className="column">
          <TrendLineDisplay
            name={"Vacuum"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"vacuum"}
            suffix={"IWC"}
          />
        </div>
        <div className="column">
          <TrendLineDisplay
            name={"Slurry Density"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"slurry_density"}
            suffix={"sg"}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <TrendLineDisplay
            name={"Slurry Velocity"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"slurry_velocity"}
            suffix={"Ft/s"}
          />
        </div>
        <div className="column">
          <TrendLineDisplay
            name={"Vertical Correction"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"vert"}
            suffix={"Ft"}
          />
        </div>
      </div>

      <div className="row">
        <div className="column">
          <TrendLineDisplay
            name={"Depth"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"depth"}
            suffix={"Ft"}
          />
        </div>
        <div className="column"></div>
      </div>
      <MessageListBox data={nonEff} />
      <Map positions={positions} />
    </div>
  );
};

export default DredgeTest;
