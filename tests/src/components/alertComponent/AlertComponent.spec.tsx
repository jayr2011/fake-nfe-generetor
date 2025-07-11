import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AlertComponent from '../../../../src/components/alertComponent/AlertComponent'

describe('AlertComponent', () => {
  it('should render title', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem de alerta"
        open={true}
      />
    )
    expect(screen.getByText('Atenção').textContent).toBe('Atenção')
  })

  it('should render description', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem de alerta"
        open={true}
      />
    )
    expect(screen.getByText('Mensagem de alerta').textContent).toBe('Mensagem de alerta')
  })

  it('should render cancel button text', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        open={true}
      />
    )
    expect(screen.getByText('Cancelar').textContent).toBe('Cancelar')
  })

  it('should render action button text', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        actionButtonText="Confirmar"
        open={true}
      />
    )
    expect(screen.getByText('Confirmar').textContent).toBe('Confirmar')
  })

  it('should call onClickAction when action button is clicked', () => {
    const onClickAction = vi.fn()
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        actionButtonText="Confirmar"
        onClickAction={onClickAction}
        open={true}
      />
    )
    fireEvent.click(screen.getByText('Confirmar'))
    expect(onClickAction).toHaveBeenCalled()
  })

  it('should call onClickCancel when cancel button is clicked', () => {
    const onClickCancel = vi.fn()
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        onClickCancel={onClickCancel}
        open={true}
      />
    )
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClickCancel).toHaveBeenCalled()
  })

  it('should call openChange when dialog open state changes', () => {
    const openChange = vi.fn()
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        open={true}
        openChange={openChange}
      />
    )
    openChange(false)
    expect(openChange).toHaveBeenCalledWith(false)
  })

  it('should render with only required props (title)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        open={true}
      />
    )
    expect(screen.getByText('Atenção').textContent).toBe('Atenção')
  })

  it('should render with only required props (description)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        open={true}
      />
    )
    expect(screen.getByText('Mensagem').textContent).toBe('Mensagem')
  })

  it('should render with all props (title)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        actionButtonText="Confirmar"
        onClickAction={() => {}}
        onClickCancel={() => {}}
        open={true}
        openChange={() => {}}
      />
    )
    expect(screen.getByText('Atenção').textContent).toBe('Atenção')
  })

  it('should render with all props (description)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        actionButtonText="Confirmar"
        onClickAction={() => {}}
        onClickCancel={() => {}}
        open={true}
        openChange={() => {}}
      />
    )
    expect(screen.getByText('Mensagem').textContent).toBe('Mensagem')
  })

  it('should render with all props (cancel button)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        actionButtonText="Confirmar"
        onClickAction={() => {}}
        onClickCancel={() => {}}
        open={true}
        openChange={() => {}}
      />
    )
    expect(screen.getByText('Cancelar').textContent).toBe('Cancelar')
  })

  it('should render with all props (action button)', () => {
    render(
      <AlertComponent
        title="Atenção"
        description="Mensagem"
        cancelButtonText="Cancelar"
        actionButtonText="Confirmar"
        onClickAction={() => {}}
        onClickCancel={() => {}}
        open={true}
        openChange={() => {}}
      />
    )
    expect(screen.getByText('Confirmar').textContent).toBe('Confirmar')
  })
})