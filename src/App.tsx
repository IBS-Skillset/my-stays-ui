import { Routes, Route } from 'react-router-dom'
import Main from './pages/main/components/main'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignIn'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
