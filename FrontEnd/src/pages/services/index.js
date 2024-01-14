import Grid from "@mui/material/Grid";
import PageHeader from "../../@core/components/page-header";
import Typography from "@mui/material/Typography";
import ServicesTable from "../../views/services/ServicesTable";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../hook/UserContext";
import {Workspace} from "../../models/Workspaces";
import toast from "react-hot-toast";
import {Users} from "../../models/Users";
import {Service} from "../../models/Services";

export default function services() {
    const { token } = useContext(UserContext);
    const [services, setServices] = useState([])

    useEffect(() => {
      (async () => {
        try {
          let servicesData = await Service.getServices(token)

          if (typeof servicesData === "number") {
            toast.error('An error has occurred')
            console.log(servicesData)
          } else {
            let data = [];

            for (const service of servicesData) {
              let owner = await Users.getUserById(token, service.owner_id);
              let users = [];

              if (typeof owner === "number") continue;

              users.push(owner)
              for (const user_id of service.users_id) {
                let userInfo = await Users.getUserById(token, user_id);

                if (typeof userInfo === "number") continue;
                users.push(userInfo)
              }
              data.push({
                ...service,
                owner: owner,
                users: users
              })
            }
            console.log(data)
            setServices(data)
          }
        } catch (e) {
          console.log(e)
          toast.error('An error has occurred')
        }
      })()
    }, []);

    return (
        <>
            <Grid container spacing={6}>
                <PageHeader
                    title={
                        <Typography variant='h4'>
                            Services
                        </Typography>
                    }
                    subtitle={
                        <Typography sx={{ color: 'text.secondary' }}>
                            Petite description pour expliquer cette page.
                        </Typography>
                    }
                />
                <Grid item xs={12}>
                    <ServicesTable data={services} />
                </Grid>
            </Grid>
        </>
    )
}
