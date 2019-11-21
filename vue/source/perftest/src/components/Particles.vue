<template>
  <div>
    <svg
      v-bind:width="innerWidth"
      v-bind:height="innerHeight"
    >
      <g
        v-bind:key="particle.key"
        v-for="(particle) in particles">
        <rect
          v-bind:x="particle.displayX"
          v-bind:y="particle.displayY"
          width="4"
          height="4">
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
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
      if (this.y > innerHeight) {
        this.y = innerHeight
        this.vy *= -1
      }
      this.life -= 1
    }
  }

  let count = 0
  const emitOnFrame = 30

  export default {
    name: 'app',
    data() {
      return {
        particles: [],
        innerWidth: 0,
        innerHeight: 0
      }
    },
    mounted: function () {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      setInterval(this.tick, 1000 / 60)
    },
    methods: {
      tick: function () {
        const particles = this.particles.concat()

        for (let i = 0; i < emitOnFrame; i++) {
          particles.push(
            new ParticleObject(
              innerWidth / 2, innerHeight / 4, count++
            )
          )
        }

        particles.forEach( (particle, index) => {
          particle.update()
          if (particle.life <= 0) {
            particles.splice(index, 1)
          }
        })

        this.particles = particles;
      }
    }
  }
</script>

