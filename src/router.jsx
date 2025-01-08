import { createHashRouter } from 'react-router'
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
