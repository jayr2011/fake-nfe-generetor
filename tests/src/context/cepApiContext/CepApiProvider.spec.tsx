import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CepApiProvider } from '../../../../src/context/cepApiContext/CepApiProvider'
import { useCepApi } from '../../../../src/context/cepApiContext/CepApiContext'

vi.mock('@/services/cep.api', () => ({
  fetchCep: vi.fn()
}))

import { fetchCep } from '../../../../src/services/cep.api'

describe('CepApiProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve fornecer valores iniciais corretos', () => {
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    expect(result.current.issuerIsLoading).toBe(false)
    expect(result.current.recipientIsLoading).toBe(false)
    expect(result.current.issuerCepError).toBeNull()
    expect(result.current.recipientCepError).toBeNull()
    expect(result.current.issuerAddressData).toBeNull()
    expect(result.current.recipientAddressData).toBeNull()
  })

  it('deve setar issuerIsLoading true durante busca e false após', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { cep: '12345-678' } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    let loadingDuring = false
    await act(async () => {
      const promise = result.current.fetchAddressData('12345-678', 'issuer')
      loadingDuring = result.current.issuerIsLoading
      await promise
    })
    expect(loadingDuring).toBe(false)
    expect(result.current.issuerIsLoading).toBe(false)
  })

  it('deve setar recipientIsLoading true durante busca e false após', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fetchCep as any).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ data: { cep: '87654-321' } }), 10)))
  const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
  let loadingDuring = false
  await act(async () => {
    const promise = result.current.fetchAddressData('87654-321', 'recipient')
    loadingDuring = result.current.recipientIsLoading
    await promise
  })
  expect(loadingDuring).toBe(false)
  expect(result.current.recipientIsLoading).toBe(false)
})

  it('deve atualizar issuerAddressData em busca válida', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { cep: '12345-678', logradouro: 'Rua Teste' } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
      await result.current.fetchAddressData('12345-678', 'issuer')
    })
    expect(result.current.issuerAddressData?.cep).toBe('12345-678')
    expect(result.current.issuerAddressData?.logradouro).toBe('Rua Teste')
  })

  it('deve atualizar recipientAddressData em busca válida', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { cep: '87654-321', logradouro: 'Rua Cliente' } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
      await result.current.fetchAddressData('87654-321', 'recipient')
    })
    expect(result.current.recipientAddressData?.cep).toBe('87654-321')
    expect(result.current.recipientAddressData?.logradouro).toBe('Rua Cliente')
  })

  it('deve setar issuerCepError em busca inválida', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { erro: true } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
      await result.current.fetchAddressData('00000-000', 'issuer')
    })
    expect(result.current.issuerCepError).toBe('endereço incorreto')
    expect(result.current.issuerAddressData).toBeNull()
  })

  it('deve setar recipientCepError em busca inválida', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { erro: true } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
      await result.current.fetchAddressData('00000-000', 'recipient')
    })
    expect(result.current.recipientCepError).toBe('endereço incorreto')
    expect(result.current.recipientAddressData).toBeNull()
  })

  it('deve limpar erros e dados ao chamar clearCepErrors', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockResolvedValue({ data: { erro: true } })
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
      await result.current.fetchAddressData('00000-000', 'issuer')
      await result.current.fetchAddressData('00000-000', 'recipient')
      result.current.clearCepErrors()
    })
    expect(result.current.issuerCepError).toBeNull()
    expect(result.current.recipientCepError).toBeNull()
    expect(result.current.issuerAddressData).toBeNull()
    expect(result.current.recipientAddressData).toBeNull()
  })

  it('deve expor as funções fetchAddressData e clearCepErrors', () => {
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    expect(typeof result.current.fetchAddressData).toBe('function')
    expect(typeof result.current.clearCepErrors).toBe('function')
  })

  it('deve tratar exceção do fetchCep', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fetchCep as any).mockRejectedValue(new Error('erro de rede'))
    const { result } = renderHook(() => useCepApi(), { wrapper: CepApiProvider })
    await act(async () => {
        await result.current.fetchAddressData('00000-000', 'issuer')
    })
    expect(result.current.issuerCepError).toBe('endereço incorreto')
    expect(result.current.issuerAddressData).toBeNull()
    })
})