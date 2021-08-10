<template>
  <div>
    <div v-if="!hasWallet">
      <Wallet />
    </div>
    <div v-if="hasWallet">
      <Account />
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  computed,
} from "vue";
import Wallet from "@/components/Wallet.vue";
import Account from "@/components/Account.vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();

    console.log("Index Store", store.getters);
    const hasWallet = ref(false);
    const test = ref("");

    console.log("setup test", test);
    return {
      test,
      hasWallet: computed(() => store.getters.hasWallet),
      store,
    };
  },
  components: {
    Wallet,
    Account,
  },
  methods: {
    logStore() {
      console.log(this.hasWallet, this.test);
      console.log(this.store.state.endpoints.rpc);
    },
  },
});
</script>
