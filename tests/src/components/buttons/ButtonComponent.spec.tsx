import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonComponent from '../../../../src/components/buttons/ButtonComponent'

describe('ButtonComponent', () => {
  it('should render label', () => {
    render(<ButtonComponent label="Clique aqui" />)
    expect(screen.getByText('Clique aqui').textContent).toBe('Clique aqui')
  })

  it('should call onClick when button is clicked', () => {
    const onClick = vi.fn()
    render(<ButtonComponent label="Clique" onClick={onClick} />)
    fireEvent.click(screen.getByText('Clique'))
    expect(onClick).toHaveBeenCalled()
  })

  it('should apply styleClass', () => {
    render(<ButtonComponent label="Estilizado" styleClass="custom-class" />)
    expect(screen.getByText('Estilizado').className).toContain('custom-class')
  })

  it('should set type as submit', () => {
    render(<ButtonComponent label="Enviar" type="submit" />)
    expect(screen.getByText('Enviar').getAttribute('type')).toBe('submit')
  })

  it('should set type as button', () => {
    render(<ButtonComponent label="Botão" type="button" />)
    expect(screen.getByText('Botão').getAttribute('type')).toBe('button')
  })

  it('should set type as reset', () => {
    render(<ButtonComponent label="Resetar" type="reset" />)
    expect(screen.getByText('Resetar').getAttribute('type')).toBe('reset')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<ButtonComponent label="Desabilitado" disabled />)
    expect(screen.getByText('Desabilitado').hasAttribute('disabled')).toBe(true)
  })

  it('should not be disabled when disabled prop is false', () => {
    render(<ButtonComponent label="Habilitado" disabled={false} />)
    expect(screen.getByText('Habilitado').hasAttribute('disabled')).toBe(false)
  })
})