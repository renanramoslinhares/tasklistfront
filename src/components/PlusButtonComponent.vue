<template>
  <v-btn
    absolute
    bottom
    color="white"
    fab
    left
    light
    @click="$emit('open-modal')"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>
<script>
export default { name: "PlusButtonComponent" };
</script>
