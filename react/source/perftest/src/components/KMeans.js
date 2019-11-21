import React, { Component } from 'react';

class Node {
  constructor(key) {
    this.key = key
    this.cx = Math.random() * window.innerWidth
    this.cy = Math.random() * window.innerHeight
    this.r = 10
    this.fill = "#aaa"
    this.near = null
    this.colors = [
      "#a00", "#7a0", "#0aa", "#70a",
      "#a70", "#0a0", "#07a", "#a0a",
      "#aa0", "#0a7", '#00a', '#a07'
    ]
  }
  updateColor(key) {
    this.near = key
    this.fill = this.colors[key]
  }
}

class Centro {
  constructor(key) {
    this.key = key
    this.cx = Math.random() * window.innerWidth
    this.cy = Math.random() * window.innerHeight
    this.r = 15
    const colors = [
      "#600", "#360", "#066", "#306",
      "#630", "#060", "#036", "#606",
      "#660", "#063", '#006', '#603'
    ]
    this.fill = colors[key]
  }
}

class KMeans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: [],
      num: 200,
      centro: [],
      k: 2,
      count: 0
    }
  }

  componentWillMount() {
    let nodes = new Array(this.state.num).fill()
    nodes = nodes.map( (_, key) => new Node(key) )
    let centro = new Array(this.state.k).fill()
    centro = centro.map( (_, key) => new Centro(key) )
    this.setState({ nodes, centro })
  }
  componentDidMount() {
    setInterval(this.solve, 1000 / 5)
    // this.solve()
  }

  solve = () => {
    if (this.state.count % 20 === 0) {
      let nodes = new Array(this.state.num).fill()
      nodes = nodes.map( (_, key) => new Node(key) )
      let centro = new Array(this.state.k).fill()
      centro = centro.map( (_, key) => new Centro(key) )
      this.setState({ nodes, centro, k: this.state.k + 1 })
    }

    const nodes = this.state.nodes.map( node => {
      const distances = this.state.centro.map( cent => {
        const distance = Math.pow(cent.cx - node.cx, 2) + 
              Math.pow(cent.cy - node.cy, 2)
        return { distance, key: cent.key }
      })
      distances.sort( (a, b) => {
        return a.distance - b.distance
      })
      node.updateColor(distances[0].key)
      return node
    })

    this.setState({ nodes })

    const centro = this.state.centro.map( centro => {
      const nearNodes = nodes.filter( node => {
        return node.near === centro.key
      })
      const cxSum = nearNodes.reduce( (acc, node) => acc + node.cx, 0 )
      const cySum = nearNodes.reduce( (acc, node) => acc + node.cy, 0 )
      centro.cx = cxSum / nearNodes.length
      centro.cy = cySum / nearNodes.length
      return centro
    })

    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <svg
          width={window.innerWidth}
          height={window.innerHeight}>
          <g>
            {this.state.nodes.map( node => {
              return (
                <circle
                  key={node.key}
                  fill={node.fill}
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}>
                </circle>
              )
            })}
            {this.state.centro.map( ce => {
              return (
                <circle
                  key={ce.key}
                  fill={ce.fill}
                  cx={ce.cx}
                  cy={ce.cy}
                  r={ce.r}>
                </circle>
              )
            })}
          </g>
        </svg>
      </div>
    )
  }
}

export default KMeans
