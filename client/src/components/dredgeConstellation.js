import { getDredge } from "../redux/ducks/dredgeSlice";
import { Stack, CircularProgress, Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Map from "./displays/Map";
import MessageListBox from "./displays/MessageListBox";
import React, { useEffect, useState } from "react";
import TrendLineDisplay from "./displays/TrendLineDisplay";
import StateDisplay from "./displays/StateDisplay";
import CompassDisplay from "./displays/CompassDisplay";
import GaugeDisplay from "./displays/GaugeDisplay";
import { TabPanel, a11yProps } from "./Tabs";
import DredgeDataAggregator from "../DredgeDataAggregator";
import "../styles.css";
import moment from "moment";

const DredgeConstellation = () => {
  // Declare Constants
  const DREDGE_NAME = "Dredge Constellation";
  const MINUTES = 30;

  // Get Dredge Data From API
  const dispatch = useDispatch();
  const dredge = useSelector((state) => state.dredge);

  // Declare State Variables
  const [positions, setPositions] = useState([[0, 0]]);
  const [trendGraphs, setTrendGraphs] = useState([]);
  const [nonEff, setNonEff] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  // Handle Tab Change
  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // On Mount, Get Dredge Data
  useEffect(() => {
    dispatch(getDredge({ name: DREDGE_NAME, minutes: MINUTES }));
  }, [dispatch]);

  // Get Dredge Data on Timer
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Updating");
      dispatch(getDredge({ name: DREDGE_NAME, minutes: MINUTES }));
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const data = DredgeDataAggregator(dredge);

    setPositions(data.positions);
    setTrendGraphs(data.graphData);
    setNonEff(data.nonEffData);
    setExtraData(data.eData);
  }, [dredge]);

  return (
    <Box className="dashboard-container">
      <h1>{DREDGE_NAME}</h1>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Charts" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <br />

      <TabPanel value={tabIndex} index={0}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {extraData.length !== 0 ? (
            <>
              <StateDisplay
                name="Non-Effective"
                value={extraData.at(-1).non_eff}
                color="success"
                secondary_color="error"
              />
              <StateDisplay
                name="Vacuum"
                value={extraData.at(-1).vacuum_break}
                color="error"
                secondary_color="success"
              />
              <StateDisplay
                name={`MSG Time: ${moment
                  .utc(extraData.at(-1).time)
                  .format("MMMM Do YYYY, h:mm:ss a")}`}
                value={true}
                color="success"
              />
            </>
          ) : (
            <CircularProgress />
          )}
        </Stack>
        <br />
        <div className="chart-container">
          <TrendLineDisplay
            name={"Vacuum"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"vacuum"}
            suffix={"IWC"}
            min={-15}
            max={0}
          />

          <TrendLineDisplay
            name={"Slurry Density"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"slurry_density"}
            suffix={"sg"}
            min={1}
            max={1.6}
          />

          <TrendLineDisplay
            name={"Slurry Velocity"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"slurry_velocity"}
            suffix={"Ft/s"}
            min={0}
            max={30}
          />

          <TrendLineDisplay
            name={"Vertical Correction"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"vert"}
            suffix={"Ft"}
            min={-10}
            max={30}
          />

          <TrendLineDisplay
            name={"Depth"}
            data={trendGraphs}
            x_axis={"time"}
            y_axis={"depth"}
            suffix={"Ft"}
            min={-100}
            max={100}
          />

          {trendGraphs.length !== 0 ? (
            <>
              <CompassDisplay
                name="Heading"
                value={trendGraphs.at(-1).heading}
              />
              <GaugeDisplay
                name="Outlet PSI"
                value={trendGraphs.at(-1).outlet_psi}
                suffix="PSI"
                min={0}
                max={100}
              />
              <GaugeDisplay
                name="Pump RPM"
                value={trendGraphs.at(-1).pump_rpm}
                suffix="RPM"
                min={0}
                max={1000}
              />
            </>
          ) : (
            <CircularProgress />
          )}
          <MessageListBox data={nonEff} />
        </div>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Map positions={positions} />
      </TabPanel>
    </Box>
  );
};

export default DredgeConstellation;
