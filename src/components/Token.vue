<template>
  <div class="container">
    <h1>My Tokens</h1>
    <div class="" v-if="loading">Loading...</div>
    <div class="tokens-wrapper">
      <table>
        <tr>
          <th>Creator</th>
          <th>Id</th>
          <th>Denom</th>
          <th>DisplayName</th>
          <th>Decimals</th>
          <th>InitialSupply</th>
          <th>Holders</th>
        </tr>
        <tr v-for="(token, index) in getOwnTokens" :key="index">
          <td class="creator">{{ token.creator }}</td>
          <td>{{ token.id }}</td>
          <td>{{ token.denom }}</td>
          <td>{{ token.displayName }}</td>
          <td>{{ token.decimals }}</td>
          <td>{{ token.initialSupply }}</td>
          <td>{{ token.holders }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script >
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      tokens: null,
      loading: true,
      address: "",
    };
  },
  mounted() {
    this.getTokens();
  },
  computed: {
    getOwnTokens() {
      return (
        this.tokens &&
        this.tokens.filter((token) => {
          console.log("Token====", token);
          return token.creator === this.address;
        })
      );
    },
  },
  methods: {
    async getTokens() {
      this.loading = false;
      let client = await this.$store.getters.getQueryClient;
      let wallet = await this.$store.getters.getWallet;
      let [account] = await wallet.getAccounts();
      let data = await client.issuance.tokenAll();
      data.forEach((element) => {
        element.holders = element.holders.toNumber();
        element.initialSupply = element.initialSupply.toNumber();
        element.decimals = element.decimals.toNumber();
        element.id = element.id.toNumber();
      });

      this.address = account.address;
      this.tokens = data;
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 90%;
  background-color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  flex-wrap: wrap;
  table {
    width: 90%;
    td,
    th {
      border: none;
      text-align: left;
      padding: 5px;
      width: 10%;
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
  }
}
@media only screen and (max-width: 900px) {
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    flex-wrap: wrap;
    table {
      tr {
        overflow: scroll;
      }
    }
  }
}
</style>