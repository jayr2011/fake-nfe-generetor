import { BrowserRouter } from 'react-router'
import AppRoutes from './routes'
import './index.css'
import { AlertProvider } from '@/context/alertContext/AlertProvider'
import { CepApiProvider } from './context/cepApiContext/CepApiProvider'

function App() {
  return (
    <CepApiProvider>
      <AlertProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AlertProvider>
    </CepApiProvider>
  )
}

export default App
