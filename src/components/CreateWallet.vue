<template>
  <div class="container">
    <Loader v-if="isLoading" />
    <div class="create-wallet">
      <div class="info">
        <h2>Please save these details</h2>
        <hr />
      </div>
      <div class="account-address">
        <h3>Account Address</h3>
        <p>{{ address }}</p>
      </div>
      <div class="mnemonic">
        <h3>Mnemonic</h3>
        <p>{{ mnemonic }}</p>
      </div>

      <button @click="TogglePopUp()">Close</button>
    </div>
  </div>
</template>

<script >
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { defineComponent } from "vue";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  props: ["TogglePopUp"],
  data() {
    return {
      address: "",
      mnemonic: "",
      isLoading: false,
    };
  },
  mounted() {
    this.createWallet();
  },
  components: {
    Loader,
  },
  methods: {
    async createWallet() {
      this.isLoading = await this.$store.getters.getIsLoading;
      console.log("createWaller", this.isLoading);

      const wallet = await DirectSecp256k1HdWallet.generate(24, {
        prefix: "autonomy",
      });

      const [account] = await wallet.getAccounts();
      this.address = account.address;
      this.mnemonic = wallet.mnemonic;
    },
    onCopy: (e) => {
      alert("You just copied the following text to the clipboard: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy the text to the clipboard");
      console.log(e);
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  z-index: 99;
  margin: 4rem 5rem 4rem 17rem;
  width: 60%;
  background-color: white;
  border-radius: 1rem;

  .create-wallet {
    display: flex;
    align-items: left;
    flex-direction: column;
    flex-wrap: wrap;
    .account-address,
    .mnemonic {
      padding: 1rem;
    }
  }
  button {
    width: 30%;
    padding: 0.5rem;
    color: hsl(183, 100%, 15%);
    font-weight: 700;
    background: hsl(172, 67%, 45%);
    border-radius: 0.5rem;
    font-size: 1.2rem;
    margin-left: 10rem;
    &:hover {
      background: rgb(159, 232, 223);
    }
  }
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0;
    padding: 2px;
    width: 90%;
    border: 1px solid hsl(183, 100%, 15%);

    h2 {
      font-size: 15px;
    }

    .create-wallet {
      width: 90%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .account-address {
        word-break: break-all;
      }
      .account-address,
      .mnemonic {
        h3 {
          font-size: 15px;
        }
        p {
          font-size: 12px;
        }
      }
    }
    button {
      font-size: 12px;
      margin-left: 6rem;
    }
  }
}
</style>
