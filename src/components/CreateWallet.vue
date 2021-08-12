<template>
  <div class="container">
    <div class="create-wallet">
      <h2>create wallt</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["TogglePopUp"],
});
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  z-index: 99;
  margin: 4rem 5rem 4rem 17rem;

  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 1rem;
}
</style>
