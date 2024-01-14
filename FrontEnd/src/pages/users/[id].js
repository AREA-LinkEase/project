import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import PageHeader from "../../@core/components/page-header";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../hook/UserContext";
import Spinner from "../../@core/components/spinner";
import {Users} from "../../models/Users";
import NetworkConfig from "../../configs/networkConfig";

export default function profile() {
    const router = useRouter();
    const [info, setInfo] = useState(null);
    const { token, user } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [isYourFriend, setYourFriend] = useState(false);

    useEffect(() => {
      (async () => {
        try {
          let newId = parseInt(router.query.id);

          if (Number.isNaN(newId)) return router.replace("/404");

          let result = await Users.getUserById(token, newId);

          if (typeof result === "number")
            return
          setInfo(result)

          let friends = await user.getFriends();

          if (typeof result === "number")
            return
          for (const friend of friends)
            if (friend.id === newId)
              setYourFriend(true)
          setLoading(false)
        } catch (e) {
          console.log(e)
        }
      })()
    }, []);

    if (isLoading)
      return <Spinner />

    return (
        <Grid container spacing={6}>
            <PageHeader
                title={
                    <Typography variant='h4'>
                        User Profile
                    </Typography>
                }
            />
            <Grid item xs={12}>
                <Card sx={{ position: 'relative' }}>
                    <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
                    <Avatar
                        alt={info.username}
                        src={NetworkConfig.url + "/assets/avatars/" + info.id + ".png"}
                        sx={{
                            width: 75,
                            height: 75,
                            left: '1.313rem',
                            top: '10.28125rem',
                            position: 'absolute',
                            border: theme => `0.25rem solid ${theme.palette.common.white}`
                        }}
                    />
                    <CardContent>
                        <Box
                            sx={{
                                mt: 5.75,
                                mb: 8.75,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h5'>{info.username}</Typography>
                            </Box>
                            <Button variant='contained' color={(isYourFriend) ? "error" : "primary"}
                              onClick={async () => {
                                if (isYourFriend) {
                                  await user.deleteFriend(info.id)
                                } else {
                                  await user.addFriends([info.id])
                                }
                                router.reload()
                              }}>{(isYourFriend) ? "Remove to your friend" : "Add to your friend"}</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
