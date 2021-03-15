<template>
  <v-card>
    <v-card-title>
      Criar nova tarefa
    </v-card-title>
    <v-card-text>
      <form ref="form">
        <v-text-field
          label="Título da sua tarefa"
          v-model="title"
          :rules="[(v) => Boolean(v) || 'Título é obrigatório']"
          required
          @keyup.enter="submit(title)"
        ></v-text-field>
      </form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple" text @click="$emit('close')">
        Fechar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="deep-purple" dark @click="submit(title)">
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
        this.title = '';
        this.$emit("close");
        this.$emit("alert", "Salvo com suscesso.");
        this.$refs.form.reset();
      });
    },
  },
};
</script>
