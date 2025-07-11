import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from '../../../../src/components/navbar/NavBar'

describe('NavBar', () => {
  it('should render the app name', () => {
    render(<NavBar />)
    expect(screen.getByText('Nota Brasil').textContent).toBe('Nota Brasil')
  })

  it('should render the \"Início\" link', () => {
    render(<NavBar />)
    expect(screen.getByText('Início').textContent).toBe('Início')
  })

  it('should render the \"Gerar Nota Fiscal\" link', () => {
    render(<NavBar />)
    expect(screen.getByText('Gerar Nota Fiscal').textContent).toBe('Gerar Nota Fiscal')
  })

  it('should render the \"Sobre Nós\" link', () => {
    render(<NavBar />)
    expect(screen.getByText('Sobre Nós').textContent).toBe('Sobre Nós')
  })
})