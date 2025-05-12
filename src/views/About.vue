<template>
  <div>
    <h1>About</h1>
    <p>This is the about page.</p>
  </div>
</template>
<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const t = proxy.$t;
proxy.successMessage(t("messages.test message"));
// proxy.errorMessage(t("messages.Error occurred"));
</script>
<!-- <script>
export default {
  mounted(){
    this.errorMessage(this.$t("messages.Error occurred"));
  }
}
</script> -->