import React from "react";
import Play from './Play'
import Login from './Login'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
const App = () => {

	return(
    <Router>
        <Switch>
          <Route path="/:roomId?" children={<Play />} />
        </Switch>
    </Router>		
	)
}

export default App