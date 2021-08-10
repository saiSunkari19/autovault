<template>
  <div>
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