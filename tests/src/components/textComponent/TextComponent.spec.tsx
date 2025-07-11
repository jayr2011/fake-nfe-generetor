import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TextComponent } from '../../../../src/components/textComponent/TextComponent'

describe('TextComponent', () => {
  it('should render title when title prop is provided', () => {
    render(<TextComponent title="Título" />)
    expect(screen.getByText('Título').tagName).toBe('H1')
  })

  it('should not render title when title prop is not provided', () => {
    render(<TextComponent />)
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })

  it('should render subtitle when subtitle prop is provided', () => {
    render(<TextComponent subtitle="Subtítulo" />)
    expect(screen.getByText('Subtítulo').tagName).toBe('H2')
  })

  it('should not render subtitle when subtitle prop is not provided', () => {
    render(<TextComponent />)
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull()
  })

  it('should render both title and subtitle when both props are provided', () => {
    render(<TextComponent title="Título" subtitle="Subtítulo" />)
    expect(screen.getByText('Título').tagName).toBe('H1')
    expect(screen.getByText('Subtítulo').tagName).toBe('H2')
  })
})