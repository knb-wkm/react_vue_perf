import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Particles from './components/Particles'

const App = () => (
  <BrowserRouter>
    <div>
      <div>
        <Link to='/particles'>Particles</Link>
      </div>
      <Route path='/particles' component={Particles} />
    </div>
  </BrowserRouter>
)
export default App;
