import Grid from "@mui/material/Grid";
import VariableTable from "../VariableTable";

export default function Variables({info}) {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <VariableTable automate={info} />
            </Grid>
        </Grid>
    )
}
