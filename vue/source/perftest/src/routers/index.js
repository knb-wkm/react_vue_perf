import VueRouter from 'vue-router'
import Particles from '@/components/Particles'
import NodeGraphs from '@/components/NodeGraphs'
import KMeans from '@/components/KMeans'

const routes = [
  { path: '/particles', name: 'particles', component: Particles },
  { path: '/node_graphs', name: 'node_graphs', component: NodeGraphs },
  { path: '/kmeans', name: 'kmeans', component: KMeans }
]

export default new VueRouter({ routes })
