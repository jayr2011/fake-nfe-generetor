import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { CepApiContext, useCepApi } from '../../../../src/context/cepApiContext/CepApiContext'
import type { CepApiContextProps } from '../../../../src/interfaces/cepApiContextInterface'
import { ReactNode } from 'react'

function MockProvider({ value, children }: { value: CepApiContextProps, children: ReactNode }) {
  return (
    <CepApiContext.Provider value={value}>
      {children}
    </CepApiContext.Provider>
  )
}

describe('CepApiContext', () => {
  it('should throw error if useCepApi is used outside provider', () => {
    function callHook() {
      renderHook(() => useCepApi())
    }
    expect(callHook).toThrow(Error)
  })

  it('should return context value when used inside provider', () => {
    const mockValue: CepApiContextProps = {
      issuerIsLoading: false,
      recipientIsLoading: true,
      issuerCepError: null,
      recipientCepError: 'CEP inválido',
      issuerAddressData: null,
      recipientAddressData: null,
      fetchAddressData: async () => {},
      clearCepErrors: () => {}
    }
    const { result } = renderHook(() => useCepApi(), {
      wrapper: ({ children }) => <MockProvider value={mockValue}>{children}</MockProvider>
    })
    expect(result.current.issuerIsLoading).toBe(false)
  })
})