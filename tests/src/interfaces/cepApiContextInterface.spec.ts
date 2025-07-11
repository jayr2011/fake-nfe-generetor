import { describe, it, expect, vi } from 'vitest'
import type { CepApiContextProps, CepField } from '../../../src/interfaces/cepApiContextInterface'
import type { AddressData } from '../../../src/interfaces/adressInterface'

describe('CepApiContextProps Interface', () => {
    describe('required fields', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const mockFetchAddressData = vi.fn(async (_cep: string, _field: CepField) => {})
        const mockClearCepErrors = vi.fn()
        const context: CepApiContextProps = {
            issuerIsLoading: false,
            recipientIsLoading: true,
            issuerCepError: null,
            recipientCepError: 'CEP inválido',
            issuerAddressData: null,
            recipientAddressData: {
                cep: '01001-000',
                logradouro: 'Praça da Sé',
                complemento: 'lado ímpar',
                bairro: 'Sé',
                localidade: 'São Paulo',
                uf: 'SP',
                ibge: '3550308',
                gia: '1004',
                ddd: '11',
                siafi: '7107'
            },
            fetchAddressData: mockFetchAddressData,
            clearCepErrors: mockClearCepErrors
        }
        it('issuerIsLoading should be boolean', () => {
            expect(context.issuerIsLoading).toBeTypeOf('boolean')
        })
        it('recipientIsLoading should be true', () => {
            expect(context.recipientIsLoading).toBe(true)
        })
        it('issuerCepError should be null', () => {
            expect(context.issuerCepError).toBeNull()
        })
        it('recipientCepError should be a string', () => {
            expect(context.recipientCepError).toBe('CEP inválido')
        })
        it('issuerAddressData should be null', () => {
            expect(context.issuerAddressData).toBeNull()
        })
        it('recipientAddressData.cep should be correct', () => {
            expect(context.recipientAddressData?.cep).toBe('01001-000')
        })
        it('fetchAddressData should be a function', () => {
            expect(typeof context.fetchAddressData).toBe('function')
        })
        it('clearCepErrors should be a function', () => {
            expect(typeof context.clearCepErrors).toBe('function')
        })
    })

    describe('AddressData as null', () => {
        const context: CepApiContextProps = {
            issuerIsLoading: false,
            recipientIsLoading: false,
            issuerCepError: null,
            recipientCepError: null,
            issuerAddressData: null,
            recipientAddressData: null,
            fetchAddressData: async () => {},
            clearCepErrors: () => {}
        }
        it('issuerAddressData should be null', () => {
            expect(context.issuerAddressData).toBeNull()
        })
        it('recipientAddressData should be null', () => {
            expect(context.recipientAddressData).toBeNull()
        })
    })

    describe('filled AddressData', () => {
        const address: AddressData = {
            cep: '22222-000',
            logradouro: 'Rua Teste',
            complemento: '',
            bairro: 'Centro',
            localidade: 'Cidade',
            uf: 'ST',
            ibge: '1234567',
            gia: '',
            ddd: '21',
            siafi: '1234'
        }
        const context: CepApiContextProps = {
            issuerIsLoading: false,
            recipientIsLoading: false,
            issuerCepError: null,
            recipientCepError: null,
            issuerAddressData: address,
            recipientAddressData: address,
            fetchAddressData: async () => {},
            clearCepErrors: () => {}
        }
        it('issuerAddressData.cep should be correct', () => {
            expect(context.issuerAddressData?.cep).toBe('22222-000')
        })
        it('recipientAddressData.bairro should be correct', () => {
            expect(context.recipientAddressData?.bairro).toBe('Centro')
        })
    })

    describe('CEP errors as string or null', () => {
        const context: CepApiContextProps = {
            issuerIsLoading: false,
            recipientIsLoading: false,
            issuerCepError: 'Erro ao buscar CEP',
            recipientCepError: null,
            issuerAddressData: null,
            recipientAddressData: null,
            fetchAddressData: async () => {},
            clearCepErrors: () => {}
        }
        it('issuerCepError should be a string', () => {
            expect(context.issuerCepError).toBe('Erro ao buscar CEP')
        })
        it('recipientCepError should be null', () => {
            expect(context.recipientCepError).toBeNull()
        })
    })

    describe('fetchAddressData and clearCepErrors functions', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const fetchAddressData = vi.fn(async (_cep: string, _field: CepField) => {})
        const clearCepErrors = vi.fn()
        const context: CepApiContextProps = {
            issuerIsLoading: false,
            recipientIsLoading: false,
            issuerCepError: null,
            recipientCepError: null,
            issuerAddressData: null,
            recipientAddressData: null,
            fetchAddressData,
            clearCepErrors
        }
        it('fetchAddressData should be called with correct params', async () => {
            await context.fetchAddressData('01001-000', 'issuer')
            expect(fetchAddressData).toHaveBeenCalledWith('01001-000', 'issuer')
        })
        it('clearCepErrors should be called', () => {
            context.clearCepErrors()
            expect(clearCepErrors).toHaveBeenCalled()
        })
    })
})