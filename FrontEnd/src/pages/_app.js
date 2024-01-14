// ** Next Imports
import Head from 'next/head'
import {Router, useRouter} from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** React Flow Style
import 'src/@core/components/reactflow/reactflow.css'

// ** Global css styles
import '../../styles/globals.css'
import "react-datepicker/dist/react-datepicker.css";
import {useContext, useEffect, useState} from "react";
import Spinner from "../@core/components/spinner";
import {UserContext, UserProvider} from "../hook/UserContext";
import { Provider } from 'react-redux'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const AuthGuard = ({children}) => {
  const router = useRouter()
  const { token, isLoaded } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !isLoaded) return;

    if (token === null)
      router.replace("/auth/login")
    else
      setLoading(false)
  }, [router.isReady, router.route, token, isLoaded]);

  if (isLoading)
    return <Spinner />
  else
    return <>{children}</>
}

const Guard = ({ children, needAuth }) => {
  if (needAuth) {
    return <AuthGuard>{children}</AuthGuard>
  } else {
    return <>{children}</>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined

  const needAuth = Component.needAuth ?? true

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName}`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName}`}
          />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <UserProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <Guard needAuth={needAuth}>
                        {getLayout(<Component {...pageProps} />)}
                      </Guard>
                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                      </ReactHotToast>
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </UserProvider>
          </SettingsProvider>
      </CacheProvider>
  )
}

export default App
