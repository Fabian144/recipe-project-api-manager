<template>
  <div class="display-message">{{ displayMessage }}</div>
</template>

<script>
export default {
  props: {
    displayMessage: String,
  },
};
</script>

<style scoped>
.display-message {
  position: fixed;
  right: 5em;
  top: 7em;
  color: white;
  background-color: black;
}
</style>
