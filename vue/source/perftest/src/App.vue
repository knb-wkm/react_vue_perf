<template>
  <div>
    <router-link to="/particles">
      particles
    </router-link>
    <router-link to="/node_graphs">
      node_graphs
    </router-link>
    <router-link to="/kmeans">
      KMeans
    </router-link>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

