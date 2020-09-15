import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Index from '../src/pages/index'

describe('Check structure', () => {
    test('secret key input', () => {
        const page = render(<Index />)
        const secretKeyInput = page.getByTestId('key').querySelector('input')

        expect(secretKeyInput).toBeTruthy()
        expect(secretKeyInput).toBeInTheDocument()
    })
    test('decrypted input', () => {
        const page = render(<Index />)
        const decryptedInput = page.getByTestId('decrypted').querySelector('textarea')

        expect(decryptedInput).toBeTruthy()
        expect(decryptedInput).toBeInTheDocument()
    })
    test('encrypted input', () => {
        const page = render(<Index />)
        const encryptedInput = page.getByTestId('encrypted').querySelector('textarea')

        expect(encryptedInput).toBeTruthy()
        expect(encryptedInput).toBeInTheDocument()
    })
})

describe('encrypt', () => {
    test('encrypt value without key', () => {
        const page = render(<Index />)
        const secretToEncrypt = 'my incredible secret to encrypt'

        fireEvent.change(
            page.getByTestId('decrypted').querySelector('textarea'),
            { target: { value: secretToEncrypt } }
        )
        const secretEncrypted = page.getByTestId('encrypted').querySelector('textarea').value

        expect(secretEncrypted).toBeTruthy()
        expect(typeof secretEncrypted).toBe('string')
        expect(secretEncrypted.length).toBe(64)
    })

    test('encrypt value without key, then add key', () => {
        const page = render(<Index />)
        const secretkey = 'my incredible secret key'
        const secretToEncrypt = 'my incredible secret to encrypt'

        fireEvent.change(
            page.getByTestId('decrypted').querySelector('textarea'),
            { target: { value: secretToEncrypt } }
        )
        const secretEncryptedWithoutKey = page.getByTestId('encrypted').querySelector('textarea').value
        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretkey } }
        )
        const secretEncryptedWithKey = page.getByTestId('encrypted').querySelector('textarea').value

        expect(secretEncryptedWithoutKey).toBeTruthy()
        expect(typeof secretEncryptedWithoutKey).toBe('string')
        expect(secretEncryptedWithoutKey.length).toBe(64)

        expect(secretEncryptedWithKey).toBeTruthy()
        expect(typeof secretEncryptedWithKey).toBe('string')
        expect(secretEncryptedWithKey.length).toBe(64)

        expect(secretEncryptedWithoutKey).not.toBe(secretEncryptedWithKey)
    })

    test('encrypt value with key', () => {
        const secretkey = 'my incredible secret key'
        const secretToEncrypt = 'my incredible secret to encrypt'

        const page = render(<Index />)

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretkey } }
        )

        fireEvent.change(
            page.getByTestId('decrypted').querySelector('textarea'),
            { target: { value: secretToEncrypt } }
        )
        const secretEncrypted = page.getByTestId('encrypted').querySelector('textarea').value

        expect(secretEncrypted).toBeTruthy()
        expect(typeof secretEncrypted).toBe('string')
        expect(secretEncrypted.length).toBe(64)
    })

    test('encrypt value with key, then remove key', () => {
        const secretkey = 'my incredible secret key'
        const secretToEncrypt = 'my incredible secret to encrypt'

        const page = render(<Index />)

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretkey } }
        )

        fireEvent.change(
            page.getByTestId('decrypted').querySelector('textarea'),
            { target: { value: secretToEncrypt } }
        )
        const secretEncryptedWithKey = page.getByTestId('encrypted').querySelector('textarea').value

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: '' } }
        )

        const secretEncryptedWithoutKey = page.getByTestId('encrypted').querySelector('textarea').value

        expect(secretEncryptedWithKey).toBeTruthy()
        expect(typeof secretEncryptedWithKey).toBe('string')
        expect(secretEncryptedWithKey.length).toBe(64)

        expect(secretEncryptedWithoutKey).toBeTruthy()
        expect(typeof secretEncryptedWithoutKey).toBe('string')
        expect(secretEncryptedWithoutKey.length).toBe(64)

        expect(secretEncryptedWithKey).not.toBe(secretEncryptedWithoutKey)
    })
})

describe('decrypt', () => {
    test('decrypt value without key', () => {
        const page = render(<Index />)
        const secretToDecrypt = 'U2FsdGVkX19Lj/oHOLft0ILu2puITLVoijmMLMhvGGeOojEM52AgjbkSYr8mFIRs'

        fireEvent.change(
            page.getByTestId('encrypted').querySelector('textarea'),
            { target: { value: secretToDecrypt } }
        )
        const secretDecrypted = page.getByTestId('decrypted').querySelector('textarea').value

        expect(secretDecrypted).toBe('my incredible secret to decrypt')
    })

    test('decrypt value without key, then add key', () => {
        const page = render(<Index />)
        const secretKey = 'my incredible secret key'
        const secretToDecrypt = 'U2FsdGVkX1/e65LcAxfT1Uhojg5PC6ImA8Z+iJWHlAXI0CJ2Yvo+39rwDxLwkRei'

        fireEvent.change(
            page.getByTestId('encrypted').querySelector('textarea'),
            { target: { value: secretToDecrypt } }
        )
        const secretDecryptedWithoutKey = page.getByTestId('decrypted').querySelector('textarea').value
        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretKey } }
        )
        const secretDecryptedWithKey = page.getByTestId('decrypted').querySelector('textarea').value

        expect(secretDecryptedWithoutKey).not.toBeTruthy()
        expect(secretDecryptedWithKey).toBe('my incredible secret to decrypt')
    })

    test('decrypt value with key', () => {
        const page = render(<Index />)
        const secretKey = 'my incredible secret key'
        const secretToDecrypt = 'U2FsdGVkX1/e65LcAxfT1Uhojg5PC6ImA8Z+iJWHlAXI0CJ2Yvo+39rwDxLwkRei'

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretKey } }
        )

        fireEvent.change(
            page.getByTestId('encrypted').querySelector('textarea'),
            { target: { value: secretToDecrypt } }
        )
        const secretDecrypted = page.getByTestId('decrypted').querySelector('textarea').value

        expect(secretDecrypted).toBe('my incredible secret to decrypt')
    })

    test('decrypt value with key, then remove key', () => {
        const page = render(<Index />)
        const secretKey = 'my incredible secret key'
        const secretToDecrypt = 'U2FsdGVkX1/e65LcAxfT1Uhojg5PC6ImA8Z+iJWHlAXI0CJ2Yvo+39rwDxLwkRei'

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: secretKey } }
        )

        fireEvent.change(
            page.getByTestId('encrypted').querySelector('textarea'),
            { target: { value: secretToDecrypt } }
        )

        fireEvent.change(
            page.getByTestId('key').querySelector('input'),
            { target: { value: '' } }
        )
        const secretEncrypted = page.getByTestId('encrypted').querySelector('textarea').value
        const secretDecrypted = page.getByTestId('decrypted').querySelector('textarea').value

        expect(secretToDecrypt).not.toBe(secretEncrypted)
        expect(secretDecrypted).toBe('my incredible secret to decrypt')
    })
})
