// REACT
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// REDUX
import { store } from './store'
import { Provider } from 'react-redux'

// CHAKRA PROVIDER
import { ChakraProvider } from '@chakra-ui/react'

// APP COMPONENT
import App from './App'

// CSS STYLE
import './index.css'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ChakraProvider>
)
