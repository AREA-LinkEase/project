import Grid from "@mui/material/Grid";
import UserTable from "../UserTable";

export default function Users({info, service}) {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserTable data={info.users} service={service} />
            </Grid>
        </Grid>
    )
}
