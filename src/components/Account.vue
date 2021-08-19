<template>
  <div class="account-wrapper">
    <div class="account">
      <h1>Account Details</h1>
      <hr />
      <div class="address-wrapper">
        <h3>Address</h3>
        <p>{{ address }}</p>
        <div class="balance-wrapper" v-if="balances.length">
          <h3>Balances</h3>
          <ul v-for="(balance, index) in getSortedBalances" :key="index">
            <li>{{ balance.denom }} - {{ balance.amount }}</li>
          </ul>
        </div>
        <div class="faucet" v-else>
          <button @click="getTokens">Get Tokens</button>
        </div>
      </div>
    </div>

    <div class="send-card">
      <Transfer />
    </div>
  </div>
</template>
<script >
import { defineComponent } from "@vue/runtime-core";
import Transfer from "@/components/Transfer.vue";
import { FaucetClient } from "@cosmjs/faucet-client";
export default defineComponent({
  name: "Account",
  data() {
    return {
      address: null,
      balances: [],
    };
  },
  components: {
    Transfer,
  },
  mounted() {
    this.getBalances();
  },
  computed: {
    getSortedBalances() {
      return [...this.balances].sort((a, b) => {
        return a.denom.toLowerCase() > b.denom.toLowerCase() ? 1 : -1;
      });
    },
  },

  methods: {
    async getBalances() {
      const wallet = await this.$store.getters.getWallet;
      const queryclient = await this.$store.getters.getQueryClient;

      // Account fetch
      let [account] = await wallet.getAccounts();
      this.address = account.address;
      let res = await queryclient.bank.allBalances(account.address);
      console.log(res);
      this.balances = res;
    },
    async getTokens() {
      const endpoints = await this.$store.getters.getEndPoints;
      const faucetClient = new FaucetClient(endpoints.faucet);

      const res = await faucetClient.credit(
        this.address,
        endpoints.faucetDenom
      );

      console.log(res);
    },
  },
});
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.account-wrapper {
  width: 80%;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  font-family: "Space Mono", monospace;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  margin-left: 7rem;

  h3 {
    color: hsl(186, 14%, 43%);
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .account {
    margin: 2rem 0 2rem 1rem;
    .address-wrapper {
      font-size: 1rem;
      float: left;
      margin-bottom: 1rem;
      .balance-wrapper {
        ul li {
          list-style-type: none;
          font-size: 1rem;
          text-transform: uppercase;
        }
      }

      .faucet {
        button {
          font-size: 1.2rem;
          padding: 0.8rem;
          border-radius: 1rem;
          background: hsl(172, 67%, 45%);
          margin-top: 2rem;
          color: hsl(183, 100%, 15%);
          width: 60%;
          text-transform: uppercase;
          &:hover {
            background-color: rgb(159, 232, 223);
          }
        }
      }
    }
  }
  .send-card {
    margin-left: 2rem;
  }
}

@media only screen and (max-width: 900px) {
  .account-wrapper {
    display: flex;
    width: 100%;
    margin: 0.2rem 0.1rem;
    flex-direction: column;
    h1,
    h3 {
      font-size: 20px;
    }
    hr {
      width: 60%;
    }
    .account {
      .address-wrapper {
        p {
          word-wrap: break-word;
          width: 60%;
        }
      }
      .balance-wrapper {
        font-size: 12px;
      }
    }
    .send-card {
      margin: 0;
    }
  }
}
</style>