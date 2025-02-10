import { createContext, useEffect, useState } from 'react'
export const UserContext = createContext();
import axios from 'axios';
import Loader from '../Loader/Loader'

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const token = localStorage.getItem('userToken');
        try {

            const response = await axios.get('https://ecommerce-node4.onrender.com/user/profile',
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                });


            setUser(response.data.user);

        } catch (e) {
            console.log(e);
            setUser(null);
        } finally{
            setLoading(false);
        }
    }

    if(loading){
        return <Loader />
    }


    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
    };


    return (
        <UserContext.Provider value={{ user,setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
