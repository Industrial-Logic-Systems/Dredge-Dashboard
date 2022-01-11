import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import "./styles.css";

function companyDredges(company, dredges) {
  return (
    <Card
      key={company}
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: "100%",
        maxWidth: "20em",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {company.toUpperCase()}
        </Typography>
        {dredges.map((dredge) => {
          if (dredge.company === company) {
            return (
              <div className="home-dredge-container" key={dredge.label}>
                <Typography
                  key={dredge.label}
                  variant="body1"
                  color="text.secondary"
                >
                  {dredge.label}
                </Typography>

                <Button variant="contained" color="primary" href={dredge.href}>
                  Go To
                </Button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </CardContent>
    </Card>
  );
}

const Home = (props) => {
  const { dredges } = props;
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    var companies = dredges.map((dredge) => dredge.company);
    companies = [...new Set(companies)];
    setCompanies(companies);
  }, [dredges]);

  return (
    <div className="home-container">
      {companies.map((company) => companyDredges(company, dredges))}
    </div>
  );
};

export default Home;
