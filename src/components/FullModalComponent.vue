<template>
  <v-row justify="center">
    <v-dialog
      v-model="value"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="deep-purple">
          <v-btn icon dark @click="$emit('input', false)">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Editar tarefa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="deleteTask(idEdit)" title="Deletar tarefa">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn dark text @click="submit()">
              Salvar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-col cols="10" class="mx-auto px-0">
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-switch
                  v-model="status"
                  label="Tarefa concluída"
                  color="deep-purple"
                  value="done"
                  hide-details
                ></v-switch
              ></v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="created_at"
                  label="Criado em minha/data/ano"
                  disabled
                  name="create"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="title"
              label="Título"
              :rules="[
                (value) => Boolean(value) || 'Título não deve ficar vazio',
              ]"
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="Descrição"
              @keyup.enter="submit()"
            ></v-textarea>
          </v-form>
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { readById, deleteById, updateById } from "@/services/taskService";

export default {
  name: "FullModalComponent",
  data: () => ({
    status: "",
    title: "",
    description: "",
    created_at: "",
    done_at: "",
    updated_at: "",
  }),
  props: { value: { type: Boolean, default: false }, idEdit: Number },
  methods: {
    deleteTask(id) {
      deleteById(id).then((resp) => {
        this.$emit(
          "alert",
          resp.success ? "Tarefa excluída." : "Erro: ".resp.message
        );
        this.close();
      });
    },
    async submit() {
      const resp = await updateById(this.idEdit, {
        status: this.status === "done" ? this.status : "open",
        title: this.title,
        description: this.description,
        created_at: this.created_at,
        done_at: this.done_at,
      });
      if(resp.success) this.close();

      const message = resp.success ? "Atualizado com sucesso." : "Erro: ".resp.message
      this.$emit("alert", message);
    },
    close() {
      this.$emit("input", false);
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
  watch: {
    idEdit(id) {
      readById(id).then((resp) => {
        this.status = resp.status;
        this.title = resp.title;
        this.description = resp.description;
        this.created_at = resp.created_at;
        this.updated_at = resp.updated_at;
        this.done_at = resp.done_at;
      });
    },
  },
};
</script>
