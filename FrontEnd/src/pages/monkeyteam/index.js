import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const teams = [
  {
    "name": "Younes Bahri",
    "job": "Project Leader",
    "color": '#e3e1fc',
    "number": 4
  },
  {
    "name": "Adil Nouiri",
    "job": "Frontend developer",
    "color": '#fafce1',
    "number": 3
  },
  {
    "name": "Thomas Papaix",
    "job": "UI Designer",
    "color": '#ccf5fa',
    "number": 2
  },
  {
    "name": "Keziah Imer",
    "job": "Backend Developer",
    "color": '#fbdddd',
    "number": 1
  },
  {
    "name": "Simon Vermeulen",
    "job": "Backend Developer",
    "color": '#d4f4e2',
    "number": 5
  },
]

export default function monkeyTeam() {
  return (
    <Box sx={{
      "width": "100%",
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "column",
      "justifyContent": "center"
    }}>
      <img src="/images/Heading.svg" alt="Heading" width="300px" style={{marginTop: 10}} />
      <Grid sx={{
        mt: 6
      }} container spacing={6} justifyContent="center" alignItems="center">
        {teams.map((member, i) => {
          return (
            <Grid item xs={6} md={4} lg={3} key={i}>
              <Card
                height="265px"
                width="262px"
                sx={{
                  boxShadow: 0,
                  color: '#4B465C',
                  borderRadius: "6px",
                  borderTopRightRadius: "20px",
                  borderTopLeftRadius: "90px"
                }}>
                <CardMedia sx={{
                  height: '185px',
                  backgroundColor: member.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <img src={"/images/teams/OIG_" + member.number + ".png"} alt={member.name} />
                </CardMedia>
                <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <Typography variant='h5' sx={{ mb: 2 }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {member.job}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
