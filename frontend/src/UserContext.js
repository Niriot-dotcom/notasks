import AuthContext from "./AuthContext.js";
import react, {useState, useEffect} from "react"

function UserContext(props) {
    const [loggedIn, setLoggedIn] = useState();
  
    const setLoggedLogged = async (valor) =>{
        const newMovies = valor
        await setLoggedIn(newMovies);
        console.log( "valor", valor);
    }
    
    useEffect(()=>{
        console.log("desde api o como se llame", loggedIn);
    },[loggedIn])

    return (
      <AuthContext.Provider value={[loggedIn, setLoggedLogged]}>
          {props.children}                      
      </AuthContext.Provider>
    )
};
  
  export default UserContext;