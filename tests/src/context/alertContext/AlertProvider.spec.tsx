import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AlertProvider } from '../../../../src/context/alertContext/AlertProvider'
import { useAlert } from '../../../../src/context/alertContext/AlertContext'

describe('AlertProvider', () => {
  it('should provide isOpen as false initially', () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: AlertProvider
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('should set isOpen to true when open is called', () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: AlertProvider
    })
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('should set isOpen to false when close is called after open', () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: AlertProvider
    })
    act(() => {
      result.current.open()
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('should provide open function', () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: AlertProvider
    })
    expect(typeof result.current.open).toBe('function')
  })

  it('should provide close function', () => {
    const { result } = renderHook(() => useAlert(), {
      wrapper: AlertProvider
    })
    expect(typeof result.current.close).toBe('function')
  })
})