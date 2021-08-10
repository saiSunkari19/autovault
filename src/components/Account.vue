<template>
  <div class="account-wrapper">
    <h1>Account Details</h1>
    <div class="address-wrapper">
      <h3>Address</h3>
      <p>Address - {{ address }}</p>
      <hr />
    </div>
    <div class="balance-wrapper">
      <h3>Balances</h3>
      <hr />
      <ul v-for="(balance, index) in balances" :key="index">
        <li>{{ balance.denom }} - {{ balance.amount }}</li>
      </ul>
    </div>
    <button @click="getBalances()">Account Page</button>

    <div class="account" v-if="account">
      {{ account }}
    </div>
  </div>
</template>
<script lang="ts">
import { BaseAccount } from "@/codec/cosmos/auth/v1beta1/auth";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "Account",
  data() {
    return {
      address: null,
      balances: null,
    };
  },

  created() {
    this.getBalances();
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
  },
});
</script>
<style lang="scss" scoped>
</style>