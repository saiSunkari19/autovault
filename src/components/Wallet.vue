<template>
  <div class="create-wallet">
    <create-wallet
      v-if="popuptrigger.buttonTrigger"
      :TogglePopUp="() => createWallet('buttonTrigger')"
    >
    </create-wallet>
  </div>
  <div class="wallet">
    <h1>AutoVault</h1>

    <div class="card">
      <textarea
        name="mnemonic"
        v-model="menmonic"
        cols="30"
        rows="7"
        placeholder="Enter the Mnemonic"
        :error="error"
      ></textarea>
      <button @click="importWallet">Import Wallet</button>
      <button @click="() => createWallet('buttonTrigger')">
        Create Wallet
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script >
import { defineComponent, ref } from "vue";
import CreateWallet from "@/components/CreateWallet.vue";
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import {
  AutonomyClient,
  autonomyRegistry,
  setupIssuanceExtension,
} from "@autonomysdk/ts-client";
import {
  GasPrice,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();

    const popuptrigger = ref({
      buttonTrigger: false,
    });

    const createWallet = (trigger) => {
      popuptrigger.value[trigger] = !popuptrigger.value[trigger];
    };
    let menmonic = ref("");
    return {
      store,
      menmonic,
      createWallet,
      popuptrigger,
    };
  },
  components: {
    CreateWallet,
  },
  methods: {
    async importWallet() {
      let words = this.menmonic.split(" ");
      if (words.length === 12 || words.length === 24) {
        console.log(this.menmonic);
        let wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.menmonic, {
          prefix: "autonomy",
        });
        const gasPrice = GasPrice.fromString("10aut");
        const gasLimits = {
          send: 200000,
        };
        const options = {
          gasPrice: gasPrice,
          gasLimits: gasLimits,
          registry: new Registry([...autonomyRegistry]),
        };

        let client = await AutonomyClient.autonomySigner(
          this.$store.state.endpoints.rpc,
          wallet,
          options
        );

        // queryClient
        const tmQueryClient = await Tendermint34Client.connect(
          this.$store.state.endpoints.rpc
        );
        const queryclient = QueryClient.withExtensions(
          tmQueryClient,
          setupAuthExtension,
          setupBankExtension,
          setupIssuanceExtension
        );
        await this.$store.dispatch("setWallet", wallet);
        await this.$store.dispatch("setClient", client);
        await this.$store.dispatch("setQueryClient", queryclient);
        await this.$store.dispatch("setOptions", options);
        await this.$store.dispatch("hasWallet", true);
        this.$router.push({ name: "Index" });
      } else {
        alert("Invalid Menmonic");
      }
      this.menmonic = "";
    },
  },
});
</script>
<style lang="scss" scoped>
.wallet {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  h1 {
    color: hsl(183, 100%, 15%);
    font-weight: 700;
    font-size: 2rem;
  }
  .card {
    background: white;
    border-radius: 1.5rem;
    width: 30%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    gap: 1rem;

    button {
      //   margin: 2rem 0 0 5rem;
      font-family: "Space Mono", monospace;
      border: none;
      display: inline;
      text-align: center;
      background: hsl(172, 67%, 45%);
      border-radius: 0.5rem;
      color: hsl(183, 100%, 15%);
      font-size: 1.5rem;
      font-weight: 700;
      text-transform: uppercase;
      transform: all 0.5s ease;
      padding: 0.7rem;
      &:hover {
        background: rgb(159, 232, 223);
      }
    }
    textarea {
      border: none;
      border-radius: 5px;
      background: hsl(189, 41%, 97%);
      color: hsl(183, 100%, 15%);
      font-size: 1.2rem;
      font-weight: 700;
      &:focus {
        outline: none;
        border: 2px solid hsl(172, 67%, 45%);
      }
    }
  }
}
@media only screen and (max-width: 900px) {
  .wallet {
    padding: 0%;
    .card {
      width: 60%;
      textarea {
        padding: 0;
        width: 100%;
        font-size: 0.9rem;
      }
      button {
        font-size: 1rem;
      }
    }
  }
}
</style>