<template>
  <div class="loading-text">{{ loadingText }}</div>
</template>

<script>
export default {
  props: {
    loadingText: String,
  },
};
</script>

<style scoped>
.loading-text {
  position: fixed;
  right: 5em;
  top: 7em;
  color: white;
  background-color: black;
}
</style>
