import { createHashRouter } from 'react-router-dom'
import App from '@/App'
import ErrorPage from '@/error-page'

const router = createHashRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },
])

export default router
