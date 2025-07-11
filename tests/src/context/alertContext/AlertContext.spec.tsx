import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { AlertContext, AlertContextProps, useAlert } from '../../../../src/context/alertContext/AlertContext'
import { ReactNode } from 'react'

function MockProvider({ value, children }: { value: AlertContextProps, children: ReactNode }) {
  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}

describe('AlertContext', () => {
    it('deve lançar erro se useAlert for usado fora do provider', () => {
      function callHook() {
        renderHook(() => useAlert())
      }
      expect(callHook).toThrow(Error)
    })

  it('should return context value when used inside provider', () => {
    const mockValue: AlertContextProps = {
      isOpen: true,
      open: () => { },
      close: () => { },
      error: null
    }
    const { result } = renderHook(() => useAlert(), {
      wrapper: ({ children }) => <MockProvider value={mockValue}>{children}</MockProvider>
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('should provide open function', () => {
    const open = () => {}
    const mockValue: AlertContextProps = {
      isOpen: false,
      open,
      close: () => {}
    }
    const { result } = renderHook(() => useAlert(), {
      wrapper: ({ children }) => <MockProvider value={mockValue}>{children}</MockProvider>
    })
    expect(result.current.open).toBe(open)
  })

  it('should provide close function', () => {
    const close = () => {}
    const mockValue: AlertContextProps = {
      isOpen: false,
      open: () => {},
      close
    }
    const { result } = renderHook(() => useAlert(), {
      wrapper: ({ children }) => <MockProvider value={mockValue}>{children}</MockProvider>
    })
    expect(result.current.close).toBe(close)
  })
})