<template>
  <div>
    <button @click="getAccount()">Account Page</button>

    <div class="account" v-if="account">
      {{ account }}
    </div>
  </div>
</template>
<script>
// import { BaseAccount } from "@/codec/cosmos/auth/v1beta1/auth";
export default {
  name: "Account",
  data() {
    return {
      client: null,
      account: null,
    };
  },
  methods: {
    async getAccount() {
      console.log("Account");
      const wallet = await this.$store.getters.getWallet;
      const queryclient = await this.$store.getters.getQueryClient;
      this.client = queryclient;
      await this.$store.dispatch("setQueryClient", this.client);

      // Account fetch
      let [account] = await wallet.getAccounts();
      console.log("Created status on Account", account.address);
      let res = await queryclient.auth.verified.account(account.address);

      // this.account = BaseAccount.decode(res.value);
      this.account = res;
    },
  },
};
</script>