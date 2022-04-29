import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {  reset, logout } from './authSlice'
import { FaSignOutAlt} from 'react-icons/fa'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {

 

    if(!user){
      navigate('/login')
    }


    return () => {
      dispatch(reset())
    }
  },[user, navigate,dispatch])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <section className ="heading">
    <h1>Hallå {user && user.name}</h1>
    <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
      </section>
      

  )
}

export default Dashboard