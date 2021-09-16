<template>
  <Loader v-if="isLoading" />
  <div class="container">
    <div class="transfer">
      <label for="recipient">Recipient:</label><br />
      <input type="text" class="inp-text" v-model="recipient" /><br />
      <label for="amount">Amount:</label><br />
      <input type="text" class="inp-text" v-model="amount" /> <br />
      <label for="memo"> Memo:</label><br />
      <input type="text" class="inp-text" v-model="memo" />
      <button @click="transfer">Send</button>
    </div>
  </div>
</template>


<script >
import { parseCoins } from "@cosmjs/stargate";

import { defineComponent, toRefs, reactive, onMounted, computed } from "vue";
import { AutonomyClient, autonomyRegistry } from "@autonomysdk/ts-client";
import Loader from "@/components/Loader.vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    let state = reactive({
      recipient: "",
      amount: "",
      memo: null,
      response: [],
      isLoading: false,
    });
    return {
      ...toRefs(state),
      isLoading: computed(() => store.getters.getIsLoading),
    };
  },
  components: {
    Loader,
  },
  methods: {
    async transfer() {
      if (this.recipient != "" && this.amount != "") {
        await this.$store.dispatch("setIsLoading", true);
        const wallet = await this.$store.getters.getWallet;
        const options = await this.$store.getters.getOptions;

        console.log("Options==", wallet, options);
        const autonomyClient = await AutonomyClient.autonomySigner(
          this.$store.state.endpoints.rpc,
          wallet,
          options
        );

        const [addres] = await wallet.getAccounts();
        console.log(addres.address);

        let bal = parseCoins(this.amount);
        try {
          const resSend = await autonomyClient.sendTokens(
            addres.address,
            this.recipient,
            bal,
            "Memo tx"
          );

          if (resSend.code == 0) {
            await this.$store.dispatch("setIsLoading", false);

            alert(
              "tx sucessfully added to blockchain ",
              resSend.transactionHash
            );
            this.recipient = "";
            this.amount = "";
            this.memo = null;
          }
        } catch (e) {
          await this.$store.dispatch("setIsLoading", false);
          alert(e);
        }
      } else {
        alert("invalid params input");
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 80%;
  background: hsl(183, 100%, 15%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 0;
  float: left;
  border-radius: 1rem;

  .transfer {
    padding: 2rem;
    padding-left: 3rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: white;
    font-weight: 400;

    input {
      border: none;
      font-size: 1.5rem;
      margin: 1rem;
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
      text-transform: lowercase;

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