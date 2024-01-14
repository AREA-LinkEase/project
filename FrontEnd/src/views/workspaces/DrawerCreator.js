import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Icon from "../../@core/components/icon";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import {Controller, useForm} from "react-hook-form";
import CustomTextField from "../../@core/components/mui/text-field";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {forwardRef, useContext, useState} from "react";
import toast from "react-hot-toast";
import {UserContext} from "../../hook/UserContext";
import {Workspace} from "../../models/Workspaces";
import {useRouter} from "next/router";

const defaultValues = {
  title: '',
  description: '',
  isPrivate: false
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

export default function DrawerCreator({isOpen, handleDrawer}) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const { token } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (data) => {
    let result = await Workspace.createNewWorkspace(token, {
      title: data.title,
      description: data.description,
      is_private: data.isPrivate,
      users_id: []
    })

    if (result === true) {
      router.reload()
      toast.success("A Workspace has created successfully")
    } else {
      toast.error("An error has occurred")
      console.log(result)
    }
    handleDrawer()
  }

  return (
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={handleDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', 400] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h5'>
          Create Workspace
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={handleDrawer}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Title'
                    onChange={onChange}
                    placeholder='Beautiful title'
                    error={Boolean(errors.title)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.title && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    {...field}
                    label='Description'
                    error={Boolean(errors.description)}
                    aria-describedby='validation-basic-textarea'
                    {...(errors.description && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Controller
                  name='isPrivate'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label='workspace will be private ?'
                      sx={errors.isPrivate ? { color: 'error.main' } : null}
                      control={
                        <Checkbox
                          {...field}
                          name='validation-basic-checkbox'
                          sx={errors.isPrivate ? { color: 'error.main' } : null}
                        />
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  )
}
