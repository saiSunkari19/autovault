<template>
  <div class="container">
    <h1>My Tokens</h1>
    <div class="" v-if="loading">Loading...</div>
    <table>
      <tr>
        <th>Creator</th>
        <th>Id</th>
        <th>Denom</th>
        <th>DisplayName</th>
        <th>InitialSupply</th>
        <th>Holders</th>
      </tr>
      <tr v-for="(token, index) in tokens" :key="index">
        <td class="creator">{{ token.creator }}</td>
        <td>{{ token.id }}</td>
        <td>{{ token.denom }}</td>
        <td>{{ token.displayName }}</td>
        <td>{{ token.initialSupply }}</td>
        <td>{{ token.holders }}</td>
      </tr>
    </table>
  </div>
</template>
<script >
import { useStore } from "@/store";
import { Token } from "@/types/Token";
export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      tokens: null,
      loading: true,
    };
  },
  mounted() {
    this.gettokens();
  },
  methods: {
    async gettokens() {
      const store = this.store;
      let client = await store.getters.getQueryClient;
      console.log("QueryClient", client, client.issuance);
      this.loading = false;

      let data = await client.issuance.tokenAll();

      data.forEach((element) => {
        element.holders = element.holders.toNumber();
        element.initialSupply = element.initialSupply.toNumber();
        element.id = element.id.toNumber();
      });

      this.tokens = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 90%;
  background-color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem;
  table {
    width: 90%;
    td,
    th {
      border: none;
      text-align: left;
      padding: 5px;
      width: 10%;
      overflow: scroll;
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
  }
}
</style>