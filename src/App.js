import { Form } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import SearchPage from "./components/search/SearchPage";
import {Routes,Route} from 'react-router-dom' 
import RestaurantPage from "./components/restaurant/RestaurantPage";
function App() {
  return (
    <main className="container-fluid main back-img-fluid "> 
    <Routes>

    <Route path="/" element={<HomePage/>}/>
    <Route path="/search-page/:meal_id" element={<SearchPage/>}/>
    <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
    </Routes>
    </main>
  );
}

export default App;
