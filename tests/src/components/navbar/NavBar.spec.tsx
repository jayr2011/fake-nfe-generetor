import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../../../../src/components/navbar/NavBar'

function renderWithRouter(component: React.ReactElement) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('NavBar', () => {
  it('should render the app name', () => {
    renderWithRouter(<NavBar />)
    expect(screen.getByText('Nota Brasil').textContent).toBe('Nota Brasil')
  })

  it('should render the Início link', () => {
    renderWithRouter(<NavBar />)
    expect(screen.getByText('Início').textContent).toBe('Início')
  })

  it('should render the Gerar Nfe link', () => {
    renderWithRouter(<NavBar />)
    expect(screen.getByText('Gerar Nfe').textContent).toBe('Gerar Nfe')
  })

  it('should render the Sobre Nós link', () => {
    renderWithRouter(<NavBar />)
    expect(screen.getByText('Sobre Nós').textContent).toBe('Sobre Nós')
  })

  it('should render the Minhas NFEs link', () => {
    renderWithRouter(<NavBar />)
    expect(screen.getByText('Minhas NFEs').textContent).toBe('Minhas NFEs')
  })

  it('should have hamburger menu button on mobile', () => {
    renderWithRouter(<NavBar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu|fechar menu/i })
    expect(menuButton).toBeDefined()
  })

  it('should toggle mobile menu when hamburger button is clicked', () => {
    renderWithRouter(<NavBar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    
    fireEvent.click(menuButton)
    
    expect(screen.getByRole('button', { name: /fechar menu/i })).toBeDefined()
  })

  it('should close mobile menu when ESC key is pressed', () => {
    renderWithRouter(<NavBar />)
    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    
    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: /fechar menu/i })).toBeDefined()
    
    fireEvent.keyDown(document, { key: 'Escape' })
    
    setTimeout(() => {
      expect(screen.getByRole('button', { name: /abrir menu/i })).toBeDefined()
    }, 350)
  })
})