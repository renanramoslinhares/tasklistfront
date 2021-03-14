<template>
  <v-card>
    <v-card-title>
      Criar nova tarefa
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Título da sua tarefa"
        v-model="title"
        :rules="[(value) => Boolean(value) || 'Título é obrigatório']"
        @keyup.enter="submit(title)"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text @click="$emit('close')">
        Fechar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="submit(title)">
        Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { create } from "@/services/taskService";

export default {
  name: "CreateTaskComponent",
  data: () => ({ title: "" }),
  methods: {
    submit(title) {
      if (!title) {
        this.$emit("alert", "É necessário inserir um título.");
        return;
      }
      create(title).then(() => {
        this.$emit("close");
        this.$emit("alert", "Salvo com suscesso.");
      });
    },
  },
};
</script>
