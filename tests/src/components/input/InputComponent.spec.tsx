import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InputComponent from '../../../../src/components/input/InputComponent'

describe('InputComponent', () => {
  it('should render input with placeholder', () => {
    render(<InputComponent placeholder="Digite aqui" />)
    expect(screen.getByPlaceholderText('Digite aqui').getAttribute('placeholder')).toBe('Digite aqui')
  })

  it('should render input with value', () => {
    render(<InputComponent value="valor" />)
    expect(screen.getByDisplayValue('valor').value).toBe('valor')
  })

  it('should call onChange when input value changes', () => {
    const onChange = vi.fn()
    render(<InputComponent onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'novo' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<InputComponent disabled />)
    expect(screen.getByRole('textbox').hasAttribute('disabled')).toBe(true)
  })

  it('should not be disabled when disabled prop is false', () => {
    render(<InputComponent disabled={false} />)
    expect(screen.getByRole('textbox').hasAttribute('disabled')).toBe(false)
  })

  it('should render input with type text', () => {
    render(<InputComponent type="text" />)
    expect(screen.getByRole('textbox').getAttribute('type')).toBe('text')
  })

  it('should render input with type email', () => {
    render(<InputComponent type="email" />)
    expect(screen.getByRole('textbox').getAttribute('type')).toBe('email')
  })

  it('should render input with type number', () => {
    render(<InputComponent type="number" />)
    expect(screen.getByRole('spinbutton').getAttribute('type')).toBe('number')
  })
})