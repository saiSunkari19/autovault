<template>
  <div>
    <button @click="() => TogglePopup('buttonTrigger')">Create Token</button>
    <issuance
      v-if="popuptrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
    </issuance>
    <Account />
    <Transfer />
  </div>
</template>
<script>
import Issuance from "@/components/Issuance.vue";
import Account from "@/components/Account.vue";
import Transfer from "@/components/Transfer.vue";
import { ref } from "vue";
export default {
  components: { Issuance, Account , Transfer},
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