import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Views/Components/Nav/Nav';
import Home from './Views/Home/Home';
import Search from "./Views/Search/Search";
import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import Landing from "./Views/Landing/Landing";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {
        pathname !== "/" && <Nav/>
      }
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/add_Game' element={<Form/>}></Route>
        <Route path='/game/:id' element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
