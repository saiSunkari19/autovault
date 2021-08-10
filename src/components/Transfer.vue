<template>
  <div class="container">
    <div class="transfer">
      <form action="" @submit.prevent="transfer">
        recipient: <input type="text" v-model="recipient" /> amount:<input
          type="text"
          v-model="amount"
        />
        Memo: <input type="text" v-model="memo" />
        <input type="submit" />
      </form>

      <div class="check" v-if="response">
        <div class="res" v-for="res in response" :key="res.transactionHash">
          {{ res }}
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { parseCoins } from "@cosmjs/stargate";
import { useStore } from "@/store";

import { defineComponent, toRefs, reactive, onMounted } from "vue";
import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/amino";
import { coins } from "@cosmjs/amino";
import Long from "long";
import { AutonomyClient, autonomyRegistry } from "@autonomysdk/ts-client";
import { GasPrice, BroadcastTxResponse } from "@cosmjs/stargate";

export default defineComponent({
  setup() {
    let state = reactive({
      recipient: "",
      amount: "",
      memo: null,
      response: [] as BroadcastTxResponse[],
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    async transfer() {
      let client = await this.$store.state.client;
      console.log("client==", client);
      const wallet = await this.$store.getters.getWallet;
      const options = await this.$store.getters.getOptions;

      console.log("Options==", wallet, options);
      const autonomyClient = await AutonomyClient.autonomySigner(
        "localhost:26657",
        wallet,
        options
      );

      const [addres] = await wallet.getAccounts();
      console.log(addres.address);

      let bal = parseCoins(this.amount);
      try {
        for (let i = 0; i < 3; i++) {
          const resSend = await client.sendTokens(
            addres.address,
            this.recipient,
            bal,
            "Memo tx"
          );
          this.response.push(resSend);
        }
      } catch (e) {
        alert(e);
      }
    },
  },
});
</script>
