<template>
  <Loader v-if="isLoading" />
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/studio">Studio</router-link> |
    <a href="https://explorer.autonomy.network" target="_blank"> Explorer</a>
  </div>
  <router-view />
</template>
<script>
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    this.isLoading = this.$store.getters.getIsLoading;
  },
};
</script>
<style lang="scss">
</style>
