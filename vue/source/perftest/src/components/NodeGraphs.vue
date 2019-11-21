<template>
  <div class="node-graphs">
    <svg
      v-bind:width="innerWidth"
      v-bind:height="innerHeight">
      <g v-for="circle in circles" v-bind:key="circle.key">
        <circle
          v-bind:cx="circle.cx"
          v-bind:cy="circle.cy"
          v-bind:r="circle.r">
        </circle>
      </g>
      <g v-for="line in lines" v-bind:key="line.key">
        <line
          v-bind:x1="line.x1"
          v-bind:x2="line.x2"
          v-bind:y1="line.y1"
          v-bind:y2="line.y2"
          style="stroke:#555;stroke-width:1"/>
      </g>
    </svg>
  </div>
</template>

<script>
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

  export default {
    name: 'node_graphs',
    
    data() {
      return {
        n: 70,
        distThre: 200,
        circles: [],
        lines: [],
        innerWidth: null,
        innerHeight: null
      }
    },
    created() {
      let circles = new Array(this.n).fill()
      circles = circles.map( (_, key) => new Circle(key))
      this.circles = circles
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight

    },
    mounted() {
      /* setInterval(this.tick, 1000 / 60)*/
      setInterval(this.tick, 1000 / 60)
    },
    methods: {
      tick: function () {
        this.circles = this.circles.map( function(circle) {
          circle.update()
          return circle
        })
        const lines = []
        this.circles.forEach( c => {
          const nears = this.circles.filter( cc => {
            return Math.abs(c.cx - cc.cx) < this.distThre &&
                   Math.abs(c.cy - cc.cy) < this.distThre
            
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
        this.lines = lines
      }
    }
  }
</script>

