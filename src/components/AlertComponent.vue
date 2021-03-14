<template>
  <div class="text-center ma-2">
    <v-snackbar color="info" class="text--indigo" v-model="isOpen">
      <v-btn color="white" icon @click="isOpen = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      {{ value }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "AlertComponent",
  data: () => ({
    isOpen: false,
  }),
  props: { value: String },
  watch: {
    isOpen(value) {
      if(!value) this.$emit('input');
    },
    value(value) {
      if (value) this.isOpen = true;
    },
  },
};
</script>
