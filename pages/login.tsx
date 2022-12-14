import { useState } from "react";
import { useRouter } from "next/router"
const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        if(response.status === 200){
            router.push('/dashboard')
        }
        console.log(response);
        
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' placeholder="email" onChange={handleChange}/>
                <input name='password' type='password' placeholder="password" onChange={handleChange}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;