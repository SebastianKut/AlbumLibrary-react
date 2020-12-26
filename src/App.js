import React from 'react';
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom';
// import pages
import Home from './pages/Home';
import About from './pages/About';
import SingleAlbum from './pages/SingleAlbum';
import Error from './pages/Error';
import Artist from './pages/Artist';
// import components
import Navbar from './components/Navbar';
// using hashRouter with github sub directory becasue of gh pages lack of support for single page apps

function App() {
  return (
    <HashRouter basename="/AlbumLibrary-react">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/album/:id">
          <SingleAlbum />
        </Route>
        <Route path="/artist/:id">
          <Artist />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
