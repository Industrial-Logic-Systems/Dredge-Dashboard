import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const headersData = [
  {
    label: "Dredge Test",
    href: "/dredge-test",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    paddingRight: "40px",
    paddingLeft: "40px",
  },
  logo: {
    fontWeight: 600,
    textAlign: "left",
  },
  menuButton: {
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const { header, logo, menuButton, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Button
          {...{
            color: "inherit",
            className: menuButton,
          }}
          onClick={() => navigate("/")}
        >
          {ilsLogo}
        </Button>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const ilsLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Industrial Logic Systems
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            className: menuButton,
          }}
          onClick={() => navigate(href)}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}
