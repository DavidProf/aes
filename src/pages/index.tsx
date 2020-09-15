import React from 'react'
import Head from 'next/head'
import {
    Container,
    TextField,
    Grid,
    Tooltip,
    LinearProgress
} from '@material-ui/core'
import CryptoJS from 'crypto-js'

export const Home: React.FC = () => {
    const [working, setWorking] = React.useState(false)
    const [decryptedValue, setDecryptedValue] = React.useState('')
    const [encryptedValue, setEncryptedValue] = React.useState('')
    const keyInput = React.useRef<HTMLInputElement>(null)

    const encrypt = (decryptedText: string): string => CryptoJS.AES.encrypt(
        decryptedText, keyInput.current.value || 'key'
    ).toString()

    const decrypt = (encryptedText: string) => {
        try {
            return CryptoJS.AES.decrypt(
                encryptedText, keyInput.current.value || 'key'
            ).toString(CryptoJS.enc.Utf8)
        } catch (e) {
            return ''
        }
    }

    const workingProgress = (cb: () => void) => {
        setWorking(true)
        cb()
        setTimeout(() => setWorking(false), 500)
    }

    const updateEncryptedValue = () => {
        workingProgress(() => setEncryptedValue(decryptedValue ? encrypt(decryptedValue) : ''))
    }

    const updateDecryptedValue = () => {
        workingProgress(() => setDecryptedValue(decrypt(encryptedValue)))
    }

    React.useEffect(updateEncryptedValue, [decryptedValue])
    React.useEffect(updateDecryptedValue, [encryptedValue])

    return (
        <>
            <Head>
                <title>NextJS Demo</title>
            </Head>
            {working && <LinearProgress style={{ position: 'fixed', width: '100vw' }} />}
            <Container maxWidth="lg">
                <Grid container justify="space-between" spacing={2} >
                    <Grid item sm={12} xs={12}>
                        <Tooltip title="Enter your secret key" placement="bottom-start">
                            <TextField
                                data-testid="key"
                                fullWidth
                                color="primary"
                                label="Key"
                                inputRef={keyInput}
                                onChange={() => {
                                    if (decryptedValue) {
                                        updateEncryptedValue()
                                    } else if (encryptedValue) {
                                        updateDecryptedValue()
                                    }
                                }}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Tooltip title="Type or paste the text to encrypt" placement="bottom-start">
                            <TextField
                                data-testid="decrypted"
                                fullWidth
                                multiline
                                rows={12}
                                variant="outlined"
                                color="primary"
                                label="Decrypted"
                                value={decryptedValue}
                                onChange={(ev) => setDecryptedValue(ev.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Tooltip title="Type or paste the text to decrypt" placement="bottom-start">
                            <TextField
                                data-testid="encrypted"
                                fullWidth
                                multiline
                                rows={12}
                                variant="outlined"
                                color="primary"
                                label="Encrypted"
                                value={encryptedValue}
                                onChange={(ev) => setEncryptedValue(ev.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home
