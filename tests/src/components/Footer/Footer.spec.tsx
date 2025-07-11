import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../../../../src/components/Footer/Footer'

describe('Footer', () => {
  it('should render developer name', () => {
    render(<Footer />)
    expect(screen.getByText('Desenvolvido por Jair Costa').textContent).toBe('Desenvolvido por Jair Costa')
  })

  it('should render current year and app name', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Fake NFe Generator`).textContent).toBe(`© ${year} Fake NFe Generator`)
  })

  it('should render contact email', () => {
    render(<Footer />)
    expect(screen.getByText('Contato: contato@jaircosta.dev').textContent).toBe('Contato: contato@jaircosta.dev')
  })
})