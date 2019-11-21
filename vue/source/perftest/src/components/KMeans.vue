<template>
  <div>
    <svg
      v-bind:width="innerWidth"
      v-bind:height="innerHeight">
      <g v-for="node in nodes" v-bind:key="node.key">
        <circle
          v-bind:fill="node.fill"
          v-bind:cx="node.cx"
          v-bind:cy="node.cy"
          v-bind:r="node.r">
        </circle>
      </g>
      <g v-for="ce in centro" v-bind:key="ce.key">
        <circle
          v-bind:fill="ce.fill"
          v-bind:cx="ce.cx"
          v-bind:cy="ce.cy"
          v-bind:r="ce.r">
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
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

  export default {
    name: 'kmeans',
    data() {
      return {
        innerWidth: null,
        innerHeight: null,
        k: 2,
        num: 300,
        nodes: [],
        centro: [],
        count: 0
      }
    },
    created() {
      let nodes = new Array(this.num).fill()
      this.nodes = nodes.map( (_, key) => new Node(key) )
      let centro = new Array(this.k).fill()
      this.centro = centro.map( (_, key) => new Centro(key) )
    },
    mounted() {
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
      setInterval(this.solve, 1000 / 5)
    },
    methods: {
      solve: function() {
        if (this.count % 20 === 0) {
          let nodes = new Array(this.num).fill()
          this.nodes = nodes.map( (_, key) => new Node(key) )
          let centro = new Array(this.k).fill()
          this.centro = centro.map( (_, key) => new Centro(key) )
          this.k += 1
        }

        this.nodes.forEach( node => {
          const distances = this.centro.map( cent => {
            const distance = Math.pow(cent.cx - node.cx, 2) +
                             Math.pow(cent.cy - node.cy, 2)
            return { distance, key: cent.key }
          })
          distances.sort( (a, b) => a.distance - b.distance )
          node.updateColor(distances[0].key)
        })
        
        this.centro.forEach( centro => {
          const nearNodes = this.nodes.filter( node => {
            return node.near === centro.key
          })
          const cxSum = nearNodes.reduce( (acc, node) => acc + node.cx, 0 )
          const cySum = nearNodes.reduce( (acc, node) => acc + node.cy, 0 )
          centro.cx = cxSum / nearNodes.length
          centro.cy = cySum / nearNodes.length
        })
        this.count += 1
      }
    }
  }
</script>

