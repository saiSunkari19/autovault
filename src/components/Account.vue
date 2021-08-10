<template>
  <div>
    <button @click="getAccount()">Account Page</button>

    <div class="account" v-if="account">
      {{ account }}
    </div>
  </div>
</template>
<script lang="ts">
import { BaseAccount } from "@/codec/cosmos/auth/v1beta1/auth";
import { Any } from "@cosmjs/proto-signing/build/codec/google/protobuf/any";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "Account",
  data() {
    return {
      client: null,
      account: {} as BaseAccount,
    };
  },

  created() {
    this.getAccount();
  },
  methods: {
    async getAccount() {
      const wallet = await this.$store.getters.getWallet;
      const queryclient = await this.$store.getters.getQueryClient;
      this.client = queryclient;
      await this.$store.dispatch("setQueryClient", this.client);

      // Account fetch
      let [account] = await wallet.getAccounts();
      console.log("Created status on Account", account.address);
      let res = await queryclient.auth.account(account.address);

      this.account = BaseAccount.decode(res.value);
      console.log(account);
    },
  },
});
</script>