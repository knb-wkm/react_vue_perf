import React, {Component, useState, useEffect} from 'react';

class ParticleObject {
  constructor(x, y, key) {
    this.x = x
    this.y = y
    this.key = key
    this.vx = 0
    this.vy = 0
    this.life = 0
    this.displayX = Math.round(this.x)
    this.displayY = Math.round(this.y)
    this.vx = 50 * (Math.random() - 0.5)
    this.vy = 50 * (Math.random() - 0.5)
    this.life = 60
  }
  update() {
    this.vy += 1
    this.vx *= 0.96
    this.vy *= 0.96
    this.x += this.vx
    this.y += this.vy
    this.displayX = Math.round(this.x)
    this.displayY = Math.round(this.y)
    if (this.y > window.innerHeight) {
      this.y = window.innerHeight
      this.vy *= -1
    }
    this.life -= 1
  }
}

const emitOnFrame = 3

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      particles: [],
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      counter: 0
    }
  }

  componentDidMount() {
    setInterval(this.tick, 1000 / 60)
  }

  conter = 0

  tick = () => {
    const particles = this.state.particles.concat()
    
    for (let i = 0; i < emitOnFrame; i++) {
      particles.push(
        new ParticleObject(
          this.state.innerWidth / 2,
          this.state.innerHeight / 4,
          this.counter++
        )
      )
    }

    particles.forEach( (particle, index) => {
      particle.update()
      if (particle.life <= 0) {
        particles.splice(index, 1)
      }
    })

    if(this.state.innerWidth !== window.innerWidth){
      this.setState({innerWidth: window.innerWidth})
    }

    if(this.state.innerHeight !== window.innerHeight) {
      this.setState({innerHeight: window.innerHeight})
    }

    this.setState({ particles })
  }

  render() {
    return (
      <div>
        <svg width={this.state.innerWidth} height={this.state.innerHeight}>
          {this.state.particles.map( particle => {
            return (
              <g>
                <rect
                  key={particle.key}
                  x={particle.displayX}
                  y={particle.displayY}
                  width="4"
                  height="4">
                </rect>
              </g>
            )
          })}
      </svg>
        </div>
    );
  }
}

export default App;
