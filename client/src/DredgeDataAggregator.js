export default function DredgeDataAggregator(dredge) {
  var data = {
    positions: [[0, 0]],
    graphData: [],
    nonEffData: [],
    eData: [],
  };

  // Update State Variables from Dredge Data
  if (dredge.data.constructor === Array) {
    const positions = dredge.data.map((data) => [
      data.ch_latitude,
      data.ch_longitude,
    ]);
    positions.reverse();
    data.positions = positions;

    const graphData = dredge.data.map((data) => {
      return {
        time: Date.parse(data.msg_time),
        vert: data.vert_correction,
        depth: data.ch_depth,
        slurry_velocity: data.slurry_velocity,
        slurry_density: data.slurry_density,
        vacuum: data.vacuum,
        heading: data.ch_heading,
        pump_rpm: data.pump_rpm,
        outlet_psi: data.outlet_psi,
      };
    });
    graphData.reverse();
    data.graphData = graphData;
  }

  // Update State Variables from NonEff Data

  if (dredge.non_eff.constructor === Array) {
    const nonEffData = dredge.non_eff.map((non_eff) => {
      return {
        sTime: Date.parse(non_eff.msgStart),
        eTime: Date.parse(non_eff.msgEnd),
        fCode: non_eff.function_code,
        msg: non_eff.message,
        id: non_eff._id,
      };
    });
    nonEffData.reverse();
    data.nonEffData = nonEffData;
  }

  // Update State Variables from Extra Data
  if (dredge.extra_data.constructor === Array) {
    const eData = dredge.extra_data.map((extra_data) => {
      return {
        time: Date.parse(extra_data.timestamp),
        non_eff: extra_data.non_eff,
        vacuum_break: extra_data.vacuum_break,
      };
    });
    eData.reverse();
    data.eData = eData;
  }

  return data;
}
