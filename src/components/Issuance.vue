<template>
  <div class="popup">
    <div class="issue">
      <h2>Create Token</h2>
      <hr />
      <ul>
        <li>
          <label for="displayName">DisplayName: </label>
          <input type="text" v-model="displayName" />
        </li>
        <li>
          <label for="decimals">Decimals: </label>

          <input type="number" class="left" v-model="decimals" />
        </li>
        <li>
          <label for="initialSupply">InitialSupply: </label>
          <input type="number" class="left" v-model="initialSupply" />
        </li>
        <li>
          <label for="denom">Denom: </label>
          <input type="text" class="left" v-model="denom" />
        </li>
        <li>
          <label for="gas">Gas: </label>
          <input type="text" v-model="gas" />
        </li>
      </ul>

      <div class="buttons">
        <button @click="createToken">create</button>
        <button class="close" @click="TogglePopup()">close</button>
      </div>
    </div>
  </div>
</template>
<script >
import Long from "long";
import { AutonomyClient } from "@autonomysdk/ts-client";
import { StdFee } from "@cosmjs/amino";
import { BroadcastTxResponse } from "@cosmjs/stargate";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  props: ["TogglePopup"],

  setup() {
    const state = reactive({
      sender: "",
      denom: "",
      displayName: "",
      decimals: 6,
      initialSupply: 1000000,
      gas: "200000",
      res: [],
    });

    return {
      ...toRefs(state),
    };
  },
  methods: {
    async createToken() {
      console.log(
        this.denom,
        this.displayName,
        this.decimals,
        this.initialSupply,
        this.gas
      );

      try {
        let wallet = await this.$store.getters.getWallet;
        let endpoints = await this.$store.getters.getEndPoints;
        let options = await this.$store.getters.getOptions;

        let autonomyClient = await AutonomyClient.autonomySigner(
          endpoints.rpc,
          wallet,
          options
        );
        let [account] = await wallet.getAccounts();
        const fee = {
          amount: [
            {
              denom: "aut",
              amount: "10",
            },
          ],
          gas: this.gas,
        };
        const res = await autonomyClient.issueTokens(
          account.address,
          this.denom,
          this.displayName,
          new Long(this.decimals),
          new Long(this.initialSupply),
          fee,
          "test-1"
        );
        console.log("Error", res);

        if (res.code == 0) {
          this.TogglePopup();
        } else {
          alert(res.rawLog);
        }
        // this.res.push(res);
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 99;

  margin: 4rem 5rem 4rem 17rem;

  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 1rem;

  .issue {
    padding: 0;
    border: 2px solid hsl(183, 100%, 15%);
    border-radius: 1rem;
    h2 {
      text-align: center;
    }
    align-items: center;
    justify-content: center;
    width: 100%;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      list-style: none;

      li input {
        border: none;
        background: hsl(189, 41%, 97%);
        color: hsl(183, 100%, 15%);
        font-size: 1rem;
        font-weight: 700;
        padding: 0.8rem;
        border-radius: 0.5rem;
        text-align: right;

        &:focus {
          outline: none;
          border: 2px solid hsl(172, 67%, 45%);
        }
      }
      .left {
        margin-right: 1.2rem;
      }

      label {
        align-items: center;
      }
    }
  }

  button {
    align-items: center;
    justify-content: space-evenly;
    margin-left: 14rem;
    gap: 0rem;
    color: hsl(183, 100%, 15%);
    background: hsl(172, 67%, 45%);
    padding: 0.5rem;
    border-radius: 10px;
    font-size: 1rem;
    margin-bottom: 0.9rem;
    transition: all 0.4s;
    &:hover {
      background: rgb(159, 232, 223);
    }
  }
}

@media only screen and (max-width: 600px) {
  .popup {
    margin: 1rem;
    width: 80%;
    padding: 1rem;
    .issue {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: stretch;
      height: 400px;
      overflow-y: scroll;

      h2 {
        font-size: 1rem;
      }

      ul {
        li input {
          font-size: 1rem;
          padding: 0.5rem;
        }
      }
    }

    button {
      margin: 1rem;
    }
  }
}
</style>