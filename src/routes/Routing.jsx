import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

function Routing() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    )
}
export default Routing