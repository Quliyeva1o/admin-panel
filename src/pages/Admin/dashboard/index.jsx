import { Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
  return (
    <>
      <h2 style={{ textAlign: "center",marginTop:'40px' }}>Admin Panel Dashboard</h2>
      <Grid container sx={{ width: "80%", margin: "30px auto" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
