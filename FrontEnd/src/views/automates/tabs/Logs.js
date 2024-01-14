import Grid from "@mui/material/Grid";
import LogsTable from "../LogsTable";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Logs({automate}) {
    let [data, setData] = useState([])

    useEffect(() => {
      (async () => {
        let logs = [];
        let result = await automate.getLogs()

        if (typeof result === "number")
          toast.error("An error has occurred")
        else {
          for (const [i, log] of result.entries()) {
            logs.push({
              ...log,
              id: i
            })
          }
          setData(logs)
        }
        console.log(result, logs)
      })()
    }, []);

    return (
        <Grid container spacing={6}>
                <Grid item xs={12}>
                    <LogsTable automate={automate} data={data} />
                </Grid>
        </Grid>
    )
}
