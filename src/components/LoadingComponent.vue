<template>
    <v-row class="fill-height mt-15" align-content="center" justify="center">
      <v-col class="text-h6 text-center" cols="12">
        Carregando...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="10"
        ></v-progress-linear>
      </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'LoadingComponent'
}
</script>