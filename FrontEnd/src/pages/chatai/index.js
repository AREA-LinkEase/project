import Box from "@mui/material/Box";
import {useSettings} from "../../@core/hooks/useSettings";
import {useTheme} from "@mui/material/styles";
import CustomTextField from "../../@core/components/mui/text-field";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Icon} from "@iconify/react";
import CustomAvatar from 'src/@core/components/mui/avatar'
import toast from "react-hot-toast";
import {ChatAI} from "../../models/AI";
import Spinner from "../../@core/components/spinner";
import CustomChip from 'src/@core/components/mui/chip'

const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  boxShadow: theme.shadows[1],
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper
}))

function Message({isSender, message}) {
  return (
    <Box sx={{ '&:not(:last-of-type)': { mb: 3 } }}>
      <div>
        <Typography
          sx={{
            boxShadow: 1,
            borderRadius: 1,
            maxWidth: '100%',
            width: 'fit-content',
            wordWrap: 'break-word',
            p: theme => theme.spacing(2.25, 4),
            ml: isSender ? 'auto' : undefined,
            borderTopLeftRadius: !isSender ? 0 : undefined,
            borderTopRightRadius: isSender ? 0 : undefined,
            color: isSender ? 'common.white' : 'text.primary',
            backgroundColor: isSender ? 'primary.main' : 'background.paper'
          }}
        >
          {message}
        </Typography>
      </div>
    </Box>
  )
}

function SendMsgForm({onSend}) {
  const [value, setValue] = useState("");

  return (
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <CustomTextField
            fullWidth
            value={value}
            placeholder='Type your question here…'
            sx={{
              '& .Mui-focused': { boxShadow: 'none !important' },
              '& .MuiInputBase-input:not(textarea).MuiInputBase-inputSizeSmall': {
                p: theme => theme.spacing(1.875, 2.5)
              },
              '& .MuiInputBase-root': { border: '0 !important' }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant='contained' onClick={() => {
            if (value !== "")
              onSend(value)
          }}>
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
  )
}

export default function ChatAIComponent() {
  const theme = useTheme()
  const { settings } = useSettings()
  const { skin } = settings
  const chatArea = useRef(null)
  const [messages, setMessages] = useState([])
  const [chatAI] = useState(new ChatAI())
  const [isLoading, setLoading] = useState(false)

  const ScrollWrapper = ({ children }) => {
    return (
      <PerfectScrollbar ref={chatArea} options={{ wheelPropagation: false }}>
        {children}
      </PerfectScrollbar>
    )
  }

  const onSend = async (message) => {
    try {
      setLoading(true)
      let newMessages = await chatAI.sendMessage(message)
      console.log(newMessages)
      if (typeof newMessages !== "number")
        setMessages(newMessages)
      setLoading(false)
    } catch (e) {
      toast.error("An error has occurred")
      console.log(e)
    }
  }

  return (
    <Grid container spacing={6} height={"100%"}>
      <Grid item xs={12} md={5} lg={4}>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
            }}
          >
            <CustomAvatar skin='light' color="warning" sx={{ width: 50, height: 50, mb: 2.25 }}>
              <Icon icon='tabler:comet' fontSize='2rem' />
            </CustomAvatar>
            <Typography variant='h4' sx={{ mb: 2.75, display: "flex", alignItems: "center" }}>
              ChatAI <CustomChip sx={{ml: 2}} label='Bêta' skin='light' color='error' />
            </Typography>
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              According to us blisters are a very common thing and we come across them very often in our daily lives. It is
              a very common occurrence like cold or fever depending upon your lifestyle.
            </Typography>
            <Button variant='contained' startIcon={<Icon icon='tabler:help' />} href={"/faq"}>FAQ</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        {isLoading ?
          <Spinner />
          :
          <Box
            className='app-chat'
            sx={{
              width: '100%',
              height: "80vh",
              display: 'flex',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'background.paper',
              boxShadow: skin === 'bordered' ? 0 : 6,
              ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
            }}
          >
              <Box
                sx={{
                  width: 0,
                  flexGrow: 1,
                  height: '100%',
                  backgroundColor: 'action.hover',
                  padding: "20px"
                }}
              >
                <Box sx={{ height: 'calc(100% - 4rem)' }}>
                  <ScrollWrapper>
                    {messages.map((message, i) => {
                      if (message.role === "system") return;
                      return <Message key={i} isSender={message.role === "user"} message={message.content} />
                    })}
                  </ScrollWrapper>
                </Box>
                <SendMsgForm onSend={onSend} />
              </Box>
          </Box>
        }
      </Grid>
    </Grid>
  )
}
