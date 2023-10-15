import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Header from './components/Header/Header.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import CreateTodoList from './pages/CreateTodoList/CreateTodoList.jsx'
import UpdateTodoList from './pages/UpdateTodolist/UpdateTodolist.jsx'
import Home from './pages/Home/Home.jsx'
import Search from './pages/Search/Search'
import Profile from './pages/Profile/Profile.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />        
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/create-todo-list" element={<CreateTodoList />} />
          <Route path="/update-todo-list/:todolistId" element={<UpdateTodoList />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

