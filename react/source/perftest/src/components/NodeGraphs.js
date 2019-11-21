import React, {Component} from 'react';

class Circle {
  constructor(key) {
    this.key = key
    this.cx = Math.random() * window.innerWidth
    this.cy = Math.random() * window.innerHeight
    this.r = 10
    this.counter = 0
    this.accX = Math.random() * 2 - 1
    this.accY = Math.random() * 2 - 1
  }
  update() {
    if (this.counter % 2 === 0) {
      this.cx += this.accX
      this.cy += this.accY
      if (this.cx >= window.innerWidth || this.cx <= 0) {
        this.accX *= -1
      }
      if (this.cy >= window.innerHeight || this.cy <= 0) {
        this.accY *= -1
      }
    }
    this.counter++
  }
}

class Line {
  constructor(key) {
    this.key = key
    this.x1 = 0
    this.x2 = 0
    this.y1 = 0
    this.y2 = 0
  }
}

class NodeGraphs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      circles: [],
      lines: [],
      num: 70,
      distThre: 200
    }
  }
  componentWillMount() {
    let circles = new Array(this.state.num).fill()
    circles = circles.map( (_, key) => new Circle(key) )
    this.setState({ circles })
  }

  componentDidMount() {
    setInterval(this.tick, 1000 / 60)
  }

  tick = () => {
    const circles = this.state.circles.map( c => {
      c.update()
      return c
    })
    this.setState({ circles })

    const lines = []

    this.state.circles.forEach( c => {
      const nears = this.state.circles.filter( cc => {
        return Math.abs(c.cx - cc.cx) < this.state.distThre
               && Math.abs(c.cy - cc.cy) < this.state.distThre
      })
      nears.forEach( n => {
        const line = new Line(lines.length)
        line.x1 = n.cx
        line.y1 = n.cy
        line.x2 = c.cx
        line.y2 = c.cy
        lines.push(line)
      })
    })
    this.setState({ lines })
  }

  render() {
    return (
      <div>
        <svg
          width={window.innerWidth}
          height={window.innerHeight}>
          <g>
            {this.state.circles.map( circle => {
              return (
                <circle
                  key={circle.key}
                  cx={circle.cx}
                  cy={circle.cy}
                  r={circle.r}>
                </circle>
              )
            })}
          </g>
          <g>
            {this.state.lines.map( line => {
              return (
                <line
                  key={line.key}
                  x1={line.x1}
                  x2={line.x2}
                  y1={line.y1}
                  y2={line.y2}
                  style={{ stroke: "#555", strokeWidth:1}}
                />
              )
            })}
          </g>
        </svg>
      </div>
    )
  }
}

export default NodeGraphs
