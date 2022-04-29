    import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from './authSlice'
import Spinner from './Spinner'


function Register() {
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password:'',
        password2:''
    })
    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSucess, message} = useSelector(
        (state) => state.auth)

     useEffect(() => {
         if(isError) {
             toast.error(message)
         }

         if(isSucess || user) {
             navigate('/')
         }

         dispatch(reset())

     }, [user,isError, isSucess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Lösenorden stämmer ej')

        }else {
            const userData = {
                name, email, password
            }

            dispatch(register(userData))
    }
}


    if(isLoading){
        return <Spinner />
    }

    return ( 
    <> 
        <section className="heading">
            <h1>
            <FaUser /> Register
            </h1>
            <p>Var god skapa konto</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}> 
                <div className='form-group'>
                <input type="text" 
                className='form-control' 
                id='name'
                name='name' 
                value={name} 
                placeholder='Skriv in namn'
                onChange={onChange}
                />    
                </div>  
                <div className='form-group'>
                <input type="email" 
                className='form-control' 
                id='email'
                name='email' 
                value={email} 
                placeholder='Skriv in email'
                onChange={onChange}
                />    
                </div>  
                <div className='form-group'>
                <input type="password" 
                className='form-control' 
                id='password'
                name='password' 
                value={password} 
                placeholder='Skriv in lösen'
                onChange={onChange}
                />    
                </div>  
                <div className='form-group'>
                <input type="password" 
                className='form-control' 
                id='password2'
                name='password2' 
                value={password2} 
                placeholder='Bekräfta lösen'
                onChange={onChange}
                />    
                </div>
                <div className='form-group'>
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
    )
}



export default Register
