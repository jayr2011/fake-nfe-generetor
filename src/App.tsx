import { BrowserRouter } from 'react-router'
import AppRoutes from './routes'
import './index.css'
import { AlertProvider } from '@/context/alertContext/AlertProvider'
import { CepApiProvider } from './context/cepApiContext/CepApiProvider'
import { ApiProvider } from './context/apiContext/apiProvider'

function App() {
  return (
      
    <ApiProvider>
    <CepApiProvider>
      <AlertProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AlertProvider>
    </CepApiProvider>
    </ApiProvider>
  )
}

export default App
