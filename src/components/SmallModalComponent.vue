<template>
  <v-dialog
    @input="(event) => $emit('input', event)"
    :value="value"
    max-width="500px"
  >
    <slot></slot>
  </v-dialog>
</template>
<script>
export default {
  name: "SmallModalComponent",
  props: { value: Boolean },
};
</script>
