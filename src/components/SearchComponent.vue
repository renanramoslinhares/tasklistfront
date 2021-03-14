<template>
  <div>
    <v-card class="px-5 py-5" height="100">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Buscar"
        outlined
      ></v-text-field>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "SearchComponent",
  data: () => ({ search: "" }),
  watch: {
    search(value) {
      this.$emit("search", value);
    },
  },
};
</script>
