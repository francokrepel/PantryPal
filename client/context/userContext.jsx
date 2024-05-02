// we are using context from react so the whole application can receive 
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for an existing token in local storage when the component mounts
        const token = localStorage.getItem('token');
        if (token && !user) { 
            axios.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({data}) => {
                setUser(data);
            }).catch(err => {
                console.log(err);
                // If there is an error (e.g., token is invalid), remove it from storage
                localStorage.removeItem('token');
            });
        }
    }, [user]);  // This effect will re-run if user changes

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}


// export const UserContext =  createContext({})
// // wraps whole application in provider
// export function UserContextProvider({children}) {
//     const [user, setUser] = useState(null)
//     useEffect(() => { // fires off everytime a page renders
//         if (!user) { 
//             axios.get('/profile').then(({data}) => { //using then cos we dont wanna use a sync and await inside useEffect, see end of doc
//                 setUser(data)
//             }) 
//         }
//     }, [user]) // This effect will re-run if user changes
//     // run all of our code that we want applied to whole application
//     return (
//         // were sending state down the application rather than up
//         <UserContext.Provider value={{user, setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }



/*
useEffect and Return Values:
useEffect is designed to handle cleanup logic by returning a function. This cleanup function is called when the component
 unmounts or before the effect runs again. If you define an async function directly inside useEffect, it implicitly 
 returns a Promise (because that’s what async functions do), not a cleanup function or undefined, which useEffect expects.
*/