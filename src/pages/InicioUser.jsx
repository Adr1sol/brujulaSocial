import { useNavigate } from "react-router-dom";
import FormInicio from "../components/FormInicio/FormInicio";

function InicioUser(){
  const navigate = useNavigate()
  return( 
 <> 
  <FormInicio/>
</>
)
}

export default InicioUser