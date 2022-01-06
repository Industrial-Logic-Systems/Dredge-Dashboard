import { getDredge } from "../redux/ducks/dredgeSlice";
import { Grid, Stack, CircularProgress, Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Map from "./displays/Map";
import MessageListBox from "./displays/MessageListBox";
import React, { useEffect, useState } from "react";
import TrendLineDisplay from "./displays/TrendLineDisplay";
import StateDisplay from "./displays/StateDisplay";
import CompassDisplay from "./displays/CompassDisplay";
import GaugeDisplay from "./displays/GaugeDisplay";
import { TabPanel, a11yProps } from "./Tabs";

const DredgeTest = () => {
  // Declare Constants
  const DREDGE_NAME = "Dredge ILS";
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

  // Update State Variables from Dredge Data
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
          heading: data.ch_heading,
        };
      });
      graphData.reverse();
      setTrendGraphs(graphData);
    }
  }, [dredge.data]);

  // Update State Variables from NonEff Data
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

  useEffect(() => {
    if (dredge.extra_data.constructor === Array) {
      const eData = dredge.extra_data.map((extra_data) => {
        return {
          time: Date.parse(extra_data.timestamp),
          non_eff: extra_data.non_eff,
          vacuum_break: extra_data.vacuum_break,
        };
      });
      eData.reverse();
      setExtraData(eData);
    }
  }, [dredge.extra_data]);

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Dredge Test</h1>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Charts" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                </>
              ) : (
                <CircularProgress />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendLineDisplay
              name={"Vacuum"}
              data={trendGraphs}
              x_axis={"time"}
              y_axis={"vacuum"}
              suffix={"IWC"}
              min={-15}
              max={0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendLineDisplay
              name={"Slurry Density"}
              data={trendGraphs}
              x_axis={"time"}
              y_axis={"slurry_density"}
              suffix={"sg"}
              min={1}
              max={1.6}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendLineDisplay
              name={"Slurry Velocity"}
              data={trendGraphs}
              x_axis={"time"}
              y_axis={"slurry_velocity"}
              suffix={"Ft/s"}
              min={0}
              max={30}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendLineDisplay
              name={"Vertical Correction"}
              data={trendGraphs}
              x_axis={"time"}
              y_axis={"vert"}
              suffix={"Ft"}
              min={-10}
              max={30}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendLineDisplay
              name={"Depth"}
              data={trendGraphs}
              x_axis={"time"}
              y_axis={"depth"}
              suffix={"Ft"}
              min={-100}
              max={100}
            />
          </Grid>
          {trendGraphs.length !== 0 ? (
            <>
              <Grid item xs={12} sm={1.5}>
                <>
                  <CompassDisplay
                    name="Heading"
                    value={trendGraphs.at(-1).heading}
                  />
                </>
              </Grid>
              <Grid item xs={12} sm={2.25}>
                <GaugeDisplay
                  name="Outlet PSI"
                  value={77}
                  suffix="PSI"
                  min={0}
                  max={100}
                />
              </Grid>
              <Grid item xs={12} sm={2.25}>
                <GaugeDisplay
                  name="Pump RPM"
                  value={250}
                  suffix="RPM"
                  min={0}
                  max={1000}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={6}>
              <CircularProgress />
            </Grid>
          )}

          <Grid item xs={12}>
            <MessageListBox data={nonEff} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Map positions={positions} />
      </TabPanel>
    </Box>
  );
};

export default DredgeTest;
