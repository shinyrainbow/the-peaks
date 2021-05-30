
import React from 'react'
import { Switch, Route,Redirect } from 'react-router'


// pages
import Home from './pages/Home'
import Search from './pages/Search'
import Article from './pages/Article'
import Bookmarks from './pages/Bookmarks'
import NotFound from './pages/NotFound'

// components
import Header from './components/Header'
import Footer from './components/Footer'

import './index.scss'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route path="/article/:id">
          <Article />
        </Route>
        <Route path="/404">
          <NotFound/>
        </Route>
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </div>
  )
}

export default App


