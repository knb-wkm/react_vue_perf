import VueRouter from 'vue-router'
import Particles from '@/components/Particles'

const routes = [
  { path: '/particles', name: 'particles', component: Particles }
]

export default new VueRouter({ routes })
