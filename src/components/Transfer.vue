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
import { AutonomyClient, autonomyRegistry } from "@autonomysdk/ts-client";
import { StdFee } from "@cosmjs/amino";
import { coins } from "@cosmjs/amino";
import Long from "long";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { defaultRegistryTypes, BroadcastTxResponse } from "@cosmjs/stargate";

export default defineComponent({
  setup() {
    let state = reactive({
      recipient: "",
      amount: "",
      memo: null,
      response: [] as BroadcastTxResponse[],
    });
    const store = useStore();
    onMounted(async () => {
      const sender = {
        menmonic:
          "kind surge maximum rapid rocket smart cycle slab infant flock alone suffer grit element indicate cricket benefit cricket sausage venture talk rib exact hair",
        address: "autonomy1s5gng5s7w4yk4tk6qmfld8r7p4468jw2hfpklu",
        path: "m/44'/118'/0'/0/0",
        recipient: "autonomy1r9nfvcdctxyg5q48ae9kupwdh4jlr8kur4sc6q",
      };

      const fee: StdFee = {
        amount: [
          {
            denom: "atn",
            amount: "100",
          },
        ],
        gas: "200000",
      };

      const gasPrice = GasPrice.fromString("3.14atn");
      const gasLimits = {
        send: 200000,
      };
      const options = {
        gasPrice: gasPrice,
        gasLimits: gasLimits,
        registry: new Registry([...autonomyRegistry]),
      };

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        sender.menmonic,
        {
          prefix: "autonomy",
        }
      );

      const [addres] = await wallet.getAccounts();
      console.log(addres.address);

      const autonomyClient = await AutonomyClient.autonomySigner(
        "localhost:26657",
        wallet,
        options
      );

      await store.dispatch("setWallet", wallet);
      await store.dispatch("setClient", autonomyClient);
      await store.dispatch("setQueryClient", options);
      await store.dispatch("hasWallet", true);
      console.debug(store);
    });
    return {
      ...toRefs(state),
      store,
    };
  },
  methods: {
    async transfer() {
      console.log("trasfet store", this.store.state.queryClient);

      const wallet = await this.store.getters.getWallet;
      const options = await this.store.getters.getQueryClient;
      const autonomyClient = await this.store.state.client;
      // AutonomyClient.autonomySigner(
      //   "localhost:26657",
      //   wallet,
      //   options
      // );

      const [addres] = await wallet.getAccounts();
      console.log(addres.address);
      let bal = parseCoins(this.amount);
      try {
        for (let i = 0; i < 3; i++) {
          const resSend = await autonomyClient.sendTokens(
            addres.address,
            this.recipient,
            bal,
            "Memo tx"
          );
          this.response.push(resSend);

          // const res = await autonomyClient.issueTokens(
          //   sender.address,
          //   "atom",
          //   "ATOM",
          //   new Long(10),
          //   new Long(1919199),
          //   fee,
          //   "test tx-1"
          // );
          // this.resissue.push(res);
        }
      } catch (e) {
        alert(e);
      }
    },
  },
});
</script>
