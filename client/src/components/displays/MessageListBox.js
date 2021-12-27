import React from "react";
import "../../styles.css";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", title: "ID", hide: true },
  { field: "fCode", headerName: "Function Code", flex: 1 },
  { field: "msg", headerName: "Message", flex: 1 },
  {
    field: "sTime",
    headerName: "Start Time",
    flex: 1,
    valueFormatter: (params) => {
      const valueFormatted = moment
        .utc(params.value)
        .format("YYYY-MM-DD HH:mm:ss");
      return `${valueFormatted}`;
    },
  },
  {
    field: "eTime",
    headerName: "End Time",
    flex: 1,
    valueFormatter: (params) => {
      const valueFormatted = moment
        .utc(params.value)
        .format("YYYY-MM-DD HH:mm:ss");
      return `${valueFormatted}`;
    },
  },
];

const MessageListBox = (props) => {
  const { data } = props;
  const sortModel = [
    {
      field: "sTime",
      sort: "desc",
    },
  ];

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sortModel={sortModel}
      />
    </div>
  );
};

export default MessageListBox;
