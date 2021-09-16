<template>
  <div class="container">
    <!-- <button @click="isLoading">Close</button> -->
    <div class="scroller">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "Loader",
  methods: {
    async isLoading() {
      await this.$store.dispatch("setIsLoading", false);
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  margin: 0px;
  width: 0px;
  height: auto;
  background-color: white;
  opacity: 1;

  z-index: 999;
}
button {
  float: right;
  width: auto;
  padding: auto;
  color: hsl(183, 100%, 15%);
  font-weight: 400;
  background: hsl(172, 67%, 45%);
  border-radius: 0.5rem;
  font-size: 1rem;
  &:hover {
    background: rgb(159, 232, 223);
  }
}

.scroller {
  position: fixed;
  top: 45%;
  left: 45%;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: hsl(183, 100%, 15%);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

@media screen and (max-width: 900px) {
  .container {
    position: fixed;
    width: 80%;
    left: 0px;
    right: 0px;
  }
}
</style>
