import React from 'react'
import Head from 'next/head'
import {
    Container,
    TextField,
    Grid,
    Tooltip,
    LinearProgress
} from '@material-ui/core'

export const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>NextJS Demo</title>
            </Head>
            {true && <LinearProgress style={{ position: 'fixed', width: '100vw' }} />}
            <Container maxWidth="lg">
                <Grid container justify="space-between" spacing={2} >
                    <Grid item sm={12} xs={12}>
                        <Tooltip title="Enter your secret key" placement="bottom-start">
                            <TextField fullWidth color="primary" label="Key" />
                        </Tooltip>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Tooltip title="Type or paste the text to encrypt" placement="bottom-start">
                            <TextField
                                fullWidth
                                multiline
                                rows={12}
                                variant="outlined"
                                color="primary"
                                label="Decrypted"
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Tooltip title="Type or paste the text to decrypt" placement="bottom-start">
                            <TextField
                                fullWidth
                                multiline
                                rows={12}
                                variant="outlined"
                                color="primary"
                                label="Encrypted"
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home
