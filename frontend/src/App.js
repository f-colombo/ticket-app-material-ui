import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/navbar.component';
import Footer from './components/footer.component';
import TicketList from './components/ticket-list.component';
import TicketAdd from './components/ticket-add.component';
import TicketEdit from './components/ticket-edit.component';
import UserAdd from './components/user-add.component';
import UserLogin from './components/user-login.component';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path={['/', '/tickets']} component={TicketList} />
        <Route exact path='/tickets/add' component={TicketAdd} />
        <Route exact path='/tickets/:id/edit' component={TicketEdit} />
        <Route exact path='/users/add' component={UserAdd} />
        <Route exact path='/users/login' component={UserLogin} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
