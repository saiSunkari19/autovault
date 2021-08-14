<template>
  <div class="container">
    <div class="transfer">
      <label for="recipient">Recipient:</label>
      <input type="text" class="inp-text" v-model="recipient" />
      <label for="amount">Amount:</label>
      <input type="text" class="inp-text" v-model="amount" />
      <label for="memo"> Memo:</label>
      <input type="text" class="inp-text" v-model="memo" />
      <button @click="transfer">Send</button>

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

import { defineComponent, toRefs, reactive, onMounted } from "vue";
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
        const resSend: BroadcastTxResponse = await autonomyClient.sendTokens(
          addres.address,
          this.recipient,
          bal,
          "Memo tx"
        );

        // if (resSend.code != 0) {
        //   alert(resSend.rawLog);
        // }
      } catch (e) {
        alert(e);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 70%;
  background: hsl(183, 100%, 15%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 2rem;
  float: left;
  border-radius: 1rem;

  .transfer {
    padding: 2rem;
    padding-left: 3rem;

    label {
      margin-bottom: 1rem;
      font-size: 1rem;
      color: white;
      font-weight: 700;
    }
    input {
      border: none;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .inp-text {
      border: none;
      text-align: left;
      font-family: "Space Mono", monospace;
      font-weight: 700;
      border-radius: 0.5rem;
      background: hsl(189, 41%, 97%);
      font-size: 1.2rem;
      padding: 0.4rem 1.8rem;
      color: hsl(183, 100%, 15%);

      &:focus {
        outline: none;
        border: 2px solid hsl(172, 67%, 45%);
      }
    }
    button {
      font-size: 1.2rem;
      padding: 0.8rem;
      border-radius: 1rem;
      background: hsl(172, 67%, 45%);
      margin-top: 2rem;
      color: hsl(183, 100%, 15%);
      width: 100%;
      text-transform: uppercase;
      &:hover {
        background-color: rgb(159, 232, 223);
      }
    }
  }
}
@media only screen and (max-width: 900px) {
  .container {
    margin: 0.3rem;
    width: 95%;

    .transfer {
      padding: 0.5rem;
      label {
        font-size: 12px;
      }
      .inp-text {
        width: 75%;
        height: 20px;
      }
      button {
        font-size: 15px;
      }
    }
  }
}
</style>