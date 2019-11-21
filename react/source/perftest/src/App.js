import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Particles from './components/Particles'
import NodeGraphs from './components/NodeGraphs'
import KMeans from './components/KMeans'

const App = () => (
  <BrowserRouter>
    <div>
      <div>
        <Link to='/particles'>Particles</Link>
        <Link to='/node_graphs'>Node Graphs</Link>
        <Link to='/kmeans'>K-Means</Link>
      </div>
      <Route path='/particles' component={Particles} />
      <Route path='/node_graphs' component={NodeGraphs} />
      <Route path='/kmeans' component={KMeans} />
    </div>
  </BrowserRouter>
)
export default App;
