import { BrowserRouter } from 'react-router'
import AppRoutes from './routes'
import './index.css'
import { AlertProvider } from '@/context/alertContext/AlertProvider'
import { CepApiProvider } from './context/cepApiContext/CepApiProvider'
import { ApiProvider } from './context/apiContext/apiProvider'
import { UserProvider } from './context/userContext/UserProvider'

function App() {
  return (
    <UserProvider>
      <ApiProvider>
        <CepApiProvider>
          <AlertProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AlertProvider>
        </CepApiProvider>
      </ApiProvider>
    </UserProvider>
  )
}

export default App
