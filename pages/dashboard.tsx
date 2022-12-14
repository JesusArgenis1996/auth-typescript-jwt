import { useState } from "react"
import { useRouter } from "next/router"
const Dashboard = () => {
    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const router = useRouter();

    const getProfile = async() =>{
        const response = await fetch('/api/profile',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        const data = await response.json();
        setUser(data)
    }

    const logout = async() => {
        const response = await fetch('/api/auth/logout',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        console.log(response)
        router.push('/')
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => getProfile()}>
                Get Profile
            </button>
            <button onClick={() => logout()}>
                Logout
            </button>
        </div>
        
    )
}

export default Dashboard;