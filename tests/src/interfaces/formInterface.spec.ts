import { describe, it, expect } from 'vitest'
import type {
    RecipientData,
    ServiceDescription,
    NfeFormInterface,
    IssuerData
} from '../../../src/interfaces/formInterface'

describe('Form Interfaces', () => {
    describe('IssuerData Interface', () => {
        const issuer: IssuerData = {
            cpfCnpj: '12345678901',
            corporateName: 'Empresa Exemplo Ltda',
            tradeName: 'Exemplo',
            address: 'Rua Teste, 123',
            zipCode: '01001-000',
            phone: '11999999999',
            email: 'teste@exemplo.com',
            stateRegistration: '123456789',
            municipalRegistration: '987654321',
            taxRegime: 'Simples Nacional'
        }
        it('should accept cpfCnpj', () => {
            expect(issuer.cpfCnpj).toBe('12345678901')
        })
        it('should accept corporateName', () => {
            expect(issuer.corporateName).toBe('Empresa Exemplo Ltda')
        })
        it('should accept tradeName', () => {
            expect(issuer.tradeName).toBe('Exemplo')
        })
        it('should accept address', () => {
            expect(issuer.address).toBe('Rua Teste, 123')
        })
        it('should accept zipCode', () => {
            expect(issuer.zipCode).toBe('01001-000')
        })
        it('should accept phone', () => {
            expect(issuer.phone).toBe('11999999999')
        })
        it('should accept email', () => {
            expect(issuer.email).toBe('teste@exemplo.com')
        })
        it('should accept stateRegistration', () => {
            expect(issuer.stateRegistration).toBe('123456789')
        })
        it('should accept municipalRegistration', () => {
            expect(issuer.municipalRegistration).toBe('987654321')
        })
        it('should accept taxRegime', () => {
            expect(issuer.taxRegime).toBe('Simples Nacional')
        })
    })

    describe('RecipientData Interface', () => {
        const recipient: RecipientData = {
            cpfCnpj: '98765432100',
            corporateName: 'Cliente Exemplo SA',
            zipCode: '02002-000',
            address: 'Avenida Cliente, 456',
            city: 'São Paulo',
            stateRegistration: '11223344',
            municipalRegistration: '44332211',
            phone: '11888888888'
        }
        it('should accept cpfCnpj', () => {
            expect(recipient.cpfCnpj).toBe('98765432100')
        })
        it('should accept corporateName', () => {
            expect(recipient.corporateName).toBe('Cliente Exemplo SA')
        })
        it('should accept zipCode', () => {
            expect(recipient.zipCode).toBe('02002-000')
        })
        it('should accept address', () => {
            expect(recipient.address).toBe('Avenida Cliente, 456')
        })
        it('should accept city', () => {
            expect(recipient.city).toBe('São Paulo')
        })
        it('should accept stateRegistration', () => {
            expect(recipient.stateRegistration).toBe('11223344')
        })
        it('should accept municipalRegistration', () => {
            expect(recipient.municipalRegistration).toBe('44332211')
        })
        it('should accept phone', () => {
            expect(recipient.phone).toBe('11888888888')
        })
    })

    describe('ServiceDescription Interface', () => {
        const service: ServiceDescription = {
            serviceCode: '001',
            description: 'Serviço de teste',
            unitValue: '100.00',
            quantity: '2',
            discount: '10.00'
        }
        it('should accept serviceCode', () => {
            expect(service.serviceCode).toBe('001')
        })
        it('should accept description', () => {
            expect(service.description).toBe('Serviço de teste')
        })
        it('should accept unitValue', () => {
            expect(service.unitValue).toBe('100.00')
        })
        it('should accept quantity', () => {
            expect(service.quantity).toBe('2')
        })
        it('should accept discount', () => {
            expect(service.discount).toBe('10.00')
        })
    })

    describe('NfeFormInterface Interface', () => {
        const nfeForm: NfeFormInterface = {
            issuer: {
                cpfCnpj: '12345678901',
                corporateName: 'Empresa Exemplo Ltda',
                tradeName: 'Exemplo',
                address: 'Rua Teste, 123',
                zipCode: '01001-000',
                phone: '11999999999',
                email: 'teste@exemplo.com',
                stateRegistration: '123456789',
                municipalRegistration: '987654321',
                taxRegime: 'Simples Nacional'
            },
            recipient: {
                cpfCnpj: '98765432100',
                corporateName: 'Cliente Exemplo SA',
                zipCode: '02002-000',
                address: 'Avenida Cliente, 456',
                city: 'São Paulo',
                stateRegistration: '11223344',
                municipalRegistration: '44332211',
                phone: '11888888888'
            },
            service: {
                serviceCode: '001',
                description: 'Serviço de teste',
                unitValue: '100.00',
                quantity: '2',
                discount: '10.00'
            }
        }
        it('should accept nested issuer', () => {
            expect(nfeForm.issuer.corporateName).toBe('Empresa Exemplo Ltda')
        })
        it('should accept nested recipient', () => {
            expect(nfeForm.recipient.city).toBe('São Paulo')
        })
        it('should accept nested service', () => {
            expect(nfeForm.service.description).toBe('Serviço de teste')
        })
    })
})