import { useNavigate } from "react-router-dom";
import FormInicio from "../components/FormInicio/FormInicio";
import Navbar from "../components/Navbar/Navbar";

function InicioUser(){
  const navigate = useNavigate()
  return( 
 <> 
 <Navbar redirigir={()=>{
    navigate("/#footer")
 }}/>
  <FormInicio/>
</>
)
}

export default InicioUser