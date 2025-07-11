import { describe, it, expect } from 'vitest'
import type { AddressData } from '../../../src/interfaces/adressInterface'

describe('AddressData Interface', () => {
    it('should accept all required fields correctly', () => {
        const address: AddressData = {
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
        }
        expect(address.cep).toBeTypeOf('string')
        expect(address.uf).toBe('SP')
        expect(address.erro).toBeUndefined()
    })

    it('should accept the optional field erro as true', () => {
        const address: AddressData = {
            cep: '00000-000',
            logradouro: '',
            complemento: '',
            bairro: '',
            localidade: '',
            uf: '',
            ibge: '',
            gia: '',
            ddd: '',
            siafi: '',
            erro: true
        }
        expect(address.erro).toBe(true)
    })

    it('should accept the optional field erro as false', () => {
        const address: AddressData = {
            cep: '00000-000',
            logradouro: '',
            complemento: '',
            bairro: '',
            localidade: '',
            uf: '',
            ibge: '',
            gia: '',
            ddd: '',
            siafi: '',
            erro: false
        }
        expect(address.erro).toBe(false)
    })

    it('should not accept missing required fields', () => {
        // @ts-expect-error Testing missing required fields
        const address: AddressData = {
            cep: '00000-000'
        }
        expect(address).toBeDefined()
    })

    it('should allow empty strings in required fields', () => {
        const address: AddressData = {
            cep: '',
            logradouro: '',
            complemento: '',
            bairro: '',
            localidade: '',
            uf: '',
            ibge: '',
            gia: '',
            ddd: '',
            siafi: ''
        }
        expect(address.cep).toBe('')
        expect(address.uf).toBe('')
    })
})