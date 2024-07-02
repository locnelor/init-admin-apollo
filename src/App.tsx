import { RouterProvider } from 'react-router-dom'
import router from './lib/router'
import useViewer from './hooks/useViewer'
import LoginPage from './pages/login/page'


function App() {
  const { user, loading } = useViewer();
  if (!!loading) return (
    <div>
      loading
    </div>
  )
  if (!user) {
    return <LoginPage />
  }
  return (
    <RouterProvider
      router={router}
    />
  )
}

export default App
