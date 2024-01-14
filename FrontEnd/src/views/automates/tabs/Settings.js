import {forwardRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Icon from "../../../@core/components/icon";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import CustomTextField from "../../../@core/components/mui/text-field";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

export default function Settings({info, automate}) {
    const [open, setOpen] = useState(false)
    const [secondDialogOpen, setSecondDialogOpen] = useState(false)
    const [userInput, setUserInput] = useState('yes')
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { checkbox: false } })

    const handleClose = () => setOpen(false)
    const onSubmit = () => setOpen(true)
    const handleSecondDialogClose = () => setSecondDialogOpen(false)

    const router = useRouter()

    const handleConfirmation = async value => {
        handleClose()
        setUserInput(value)
        if (value === "yes") {
          await automate.destroy()
        }
        setSecondDialogOpen(true)
    }

    const [title, setTitle] = useState(info.title)
    const [description, setDescription] = useState(info.description);
    const [isCheck, setCheck] = useState(info.is_private);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Edit information' />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <CustomTextField
                                  fullWidth
                                  label='Name'
                                  placeholder=''
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                              <CustomTextField
                                rows={4}
                                multiline
                                fullWidth
                                label='Description'
                                id='textarea-outlined-static'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                  label='Need to be private ?'
                                  control={<Checkbox
                                    name='basic-checked'
                                    checked={isCheck}
                                    onChange={(e) => setCheck(e.target.checked)}
                                  />} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' onClick={async () => {
                                  let result = await automate.edit({
                                    title,
                                    description,
                                    is_private: isCheck
                                  })

                                  if (typeof result === "number")
                                    toast.error("An error has occurred")
                                  else {
                                    router.reload();
                                    toast.success("The automate has edited successfully")
                                  }
                                }}>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Delete Automate' />
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ mb: 4 }}>
                                <FormControl>
                                    <Controller
                                        name='checkbox'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                label='I confirm delete automate'
                                                sx={{ '& .MuiTypography-root': { color: errors.checkbox ? 'error.main' : 'text.secondary' } }}
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        size='small'
                                                        name='validation-basic-checkbox'
                                                        sx={errors.checkbox ? { color: 'error.main' } : null}
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                    {errors.checkbox && (
                                        <FormHelperText
                                            id='validation-basic-checkbox'
                                            sx={{ mx: 0, color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
                                        >
                                            Please confirm you want to delete the automate
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                                Delete Automate
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
                <DialogContent
                    sx={{
                        pb: theme => `${theme.spacing(6)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            '& svg': { mb: 6, color: 'warning.main' }
                        }}
                    >
                        <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
                        <Typography>Are you sure you would like to destroy the automate ?</Typography>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
                        Yes
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel')}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
                <DialogContent
                    sx={{
                        pb: theme => `${theme.spacing(6)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            '& svg': {
                                mb: 8,
                                color: userInput === 'yes' ? 'success.main' : 'error.main'
                            }
                        }}
                    >
                        <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
                        <Typography variant='h4' sx={{ mb: 5 }}>
                            {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Button variant='contained' color='success' onClick={() => {
                      handleSecondDialogClose()
                      router.replace("/workspaces/" + info.workspace_id)
                    }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
