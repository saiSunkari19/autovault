<template>
  <div class="container" v-if="hasWallet">
    <button @click="() => TogglePopup('buttonTrigger')">Create Token</button>
    <issuance
      v-if="popuptrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
    </issuance>
    <Token />
  </div>
  <div>
    <h2>
      Wallet not initilized go to
      <router-link to="/">Home</router-link>
    </h2>
  </div>
</template>
<script>
import Issuance from "@/components/Issuance.vue";
import Token from "@/components/Token.vue";
import { ref, computed } from "vue";
import { useStore } from "@/store";
export default {
  components: { Issuance, Token },
  setup() {
    const popuptrigger = ref({ buttonTrigger: false });
    const store = useStore();

    const TogglePopup = (trigger) => {
      popuptrigger.value[trigger] = !popuptrigger.value[trigger];
    };

    return {
      Issuance,
      popuptrigger,
      TogglePopup,
      hasWallet: computed(() => store.getters.hasWallet),
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  button {
    font-size: 1.2rem;
    padding: 0.8rem;
    border-radius: 1rem;
    background: hsl(172, 67%, 45%);
    margin-top: 2rem;
    color: hsl(183, 100%, 15%);
    width: auto;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(159, 232, 223);
    }
  }
}
</style>