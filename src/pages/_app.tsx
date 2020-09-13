import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    createMuiTheme,
    MuiThemeProvider,
    CssBaseline,
    colors, Link, Toolbar, AppBar, Button, Grid
} from '@material-ui/core'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: colors.green[500]
        },
        secondary: {
            main: colors.green[900]
        }
    },
    overrides: {
        MuiContainer: {
            root: {
                paddingTop: 40,
                paddingBottom: 80
            }
        }
    }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter()

    return (<>
        <Head>
            <title>{router.pathname.split('/').pop()} - NextJS Demo</title>
        </Head>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <footer>
                <AppBar position="fixed" color="secondary" style={{ top: 'auto', bottom: 0 }}>
                    <Toolbar variant="dense">
                        <Grid container justify="space-around">
                            <Link href="https://github.com/DavidProf" target="_blank">
                                <Button>Author</Button>
                            </Link>
                            <Link href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank">
                                <Button variant="outlined">AES</Button>
                            </Link>
                            <Link href="https://github.com/DavidProf/aes" target="_blank">
                                <Button variant="contained">Github</Button>
                            </Link>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </footer>
        </MuiThemeProvider>
    </>)
}

export default MyApp
