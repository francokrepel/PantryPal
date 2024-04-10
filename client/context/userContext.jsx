import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const UserContext =  createContext({})
// wraps whole application in provider
export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    useEffect(() => { // fires off everytime a page renders
        if (!user) { 
            axios.get('/profile').then(({data}) => { //using then cos we dont wanna use a sync and await inside useEffect, see end of doc
                setUser(data)
            }) 
        }
    }, [])
    // run all of our code that we want applied to whole application
    return (
        // were sending state down the application rather than up
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}



/*
useEffect and Return Values:
useEffect is designed to handle cleanup logic by returning a function. This cleanup function is called when the component
 unmounts or before the effect runs again. If you define an async function directly inside useEffect, it implicitly 
 returns a Promise (because that’s what async functions do), not a cleanup function or undefined, which useEffect expects.
*/