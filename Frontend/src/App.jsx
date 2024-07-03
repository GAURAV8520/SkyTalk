
import { Route,Routes } from "react-router-dom"
import HomePage from "./Pages/home/HomePage"
import SignUpPage from "./Pages/auth/signup/SignUpPage"
import LoginPage from "./Pages/auth/login/LoginPage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./Pages/notification/NotificationPage"
import ProfilePage from "./Pages/profile/ProfilePage"

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>

      <Sidebar/>

    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/notifications' element={<NotificationPage/>} />
      <Route path='/profile/:username' element={<ProfilePage/>} />

    </Routes>

    <RightPanel/>


    </div>
  )
}

export default App
