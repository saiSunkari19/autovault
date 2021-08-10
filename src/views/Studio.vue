<template>
  <div class="container">
    <button @click="() => TogglePopup('buttonTrigger')">Create Token</button>
    <issuance
      v-if="popuptrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
    </issuance>
    <Token />
  </div>
</template>
<script>
import Issuance from "@/components/Issuance.vue";
import Token from "@/components/Token.vue";
import { ref } from "vue";
export default {
  components: { Issuance, Token },
  setup() {
    const popuptrigger = ref({ buttonTrigger: false });

    const TogglePopup = (trigger) => {
      popuptrigger.value[trigger] = !popuptrigger.value[trigger];
    };

    return {
      Issuance,
      popuptrigger,
      TogglePopup,
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