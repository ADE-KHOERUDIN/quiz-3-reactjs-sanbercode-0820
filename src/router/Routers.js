import React, { useContext } from 'react'
import { AturSesi } from '../ceksesi/AturSesi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";

import Home from '../home/Home'
import About from '../home/About'
import MovieList from '../movielist/MovieList'
import Logo from '../public/logo.png'
import Footer from '../home/Footer'
import Login from '../home/Login'

function Routers() {
  const { state, dispatch } = useContext(AturSesi)

  const lsuser = localStorage.getItem('session');
	if (!state.session && lsuser !== null) {
		dispatch({
			type: 'SET_SESSION',
			payload: JSON.parse(lsuser)
		});
  }

  const doLogout = () => {
		localStorage.clear();
		dispatch({
			type: 'SET_SESSION',
			payload: null
		});
	};  

  return (
    <Router>
      <div>
        <header>
        <Link to="/">
        <img src={Logo} alt='website logo' style={{width: "200px",marginLeft:"10px"}} />
        </Link>
        <nav>
          <ul style={{marginRight:"30px"}}>
           <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              {
               (state.session && state.session !== null) ?
                  <Link to="/movies">Movie List Editor</Link>
              :
                  <Link to="/login">Login</Link>
              }
            </li>
            <li>
            {
              (state.session && state.session !== null) ?
                 <Link to="/keluar" onClick={() => doLogout()}>Logout </Link>
              :
                 null
            }
            </li>
          </ul>
        </nav>
        </header>
    
        <section>
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>     
          <Route path="/about">
             <About />
          </Route>
          <Route exact path="/movies">
            {
               (state.session && state.session !== null) ?
                <MovieList />  :  <Redirect to="/login" />
             }                    
          </Route>
          <Route path="/login">
          {
               (state.session && state.session !== null) ?
                <Redirect to="/" />   :  <Login /> 
          } 
          </Route>
          <Route path="/keluar">
            <Redirect to="/login" />
          </Route>
         </Switch>
         </section>
         <Footer/>
      </div>
    </Router>
  );
}

export default Routers