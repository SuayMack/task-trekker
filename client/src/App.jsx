import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Header from './components/Header/Header.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import CreateTodoList from './pages/CreateTodoList/CreateTodoList.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-todo-list" element={<CreateTodoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

