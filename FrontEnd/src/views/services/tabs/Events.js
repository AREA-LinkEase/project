import Grid from "@mui/material/Grid";
import EventsTable from "../EventsTable";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const callbackEvent = {
  "action": "getActions",
  "trigger": "getTriggers"
}

export default function Events({type, info, service}) {
    let [data, setData] = useState([])

    useEffect(() => {
      (async () => {
        let result = await service[callbackEvent[type]]()

        if (typeof result === "number")
          toast.error("An error has occurred")
        else
          setData(result)
        console.log(result)
      })()
    }, [type]);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <EventsTable defaultSelect={type} id={info.id} service={service} data={data} />
            </Grid>
        </Grid>
    )
}
