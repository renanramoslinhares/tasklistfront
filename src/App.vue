<template>
  <v-app>
    <v-card class="mx-auto col-12" flat max-width="540">
      <v-app-bar color="deep-purple accent-4 mb-10" dark prominent>
        <v-app-bar-title class="mb-10">
          <span class="text-h4"><v-icon>mdi-checkbox-marked-outline</v-icon> TaskList</span>
        </v-app-bar-title>

        <PlusButtonComponent
          @open-modal="() => (smallModalIsOpen = !smallModalIsOpen)"
        />
      </v-app-bar>

      <v-main>
        <ListComponent
          @alert="(value) => (alertText = value)"
          @idEdit="(value) => openFullModal(value)"
          :isLoading="isLoading"
          :tasks="tasksList"
        />
        <SmallModalComponent v-model="smallModalIsOpen">
          <CreateTaskComponent @close="() => (smallModalIsOpen = false)" />
        </SmallModalComponent>
        <FullModalComponent
          v-model="fullModalIsOpen"
          :idEdit="idEdit"
          @alert="(value) => (alertText = value)"
        />
        <AlertComponent v-model="alertText" />
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import ListComponent from "@/components/ListComponent";
import FullModalComponent from "@/components/FullModalComponent";
import SmallModalComponent from "@/components/SmallModalComponent";
import CreateTaskComponent from "@/components/CreateTaskComponent";
import PlusButtonComponent from "@/components/PlusButtonComponent";
import AlertComponent from "@/components/AlertComponent";

import { readAll } from "@/services/taskService";

export default {
  name: "App",
  components: {
    ListComponent,
    FullModalComponent,
    SmallModalComponent,
    CreateTaskComponent,
    PlusButtonComponent,
    AlertComponent,
  },

  data: () => ({
    fullModalIsOpen: false,
    smallModalIsOpen: false,
    alertText: "",
    idEdit: 0,
    tasksList: [],
  }),
  methods: {
    openFullModal(value) {
      this.idEdit = value;
      this.fullModalIsOpen = true;
    },
    loadList() {
      this.isLoading = true;
      readAll().then((resp) => {
        this.tasksList = resp;
        this.isLoading = false;
      });
    },
  },
  watch: {
    fullModalIsOpen(value) {
      if (!value) {
        this.loadList();
        this.idEdit = 0;
      }
    },
    smallModalIsOpen(value) {
      if (!value) this.loadList();
    },
  },
  created() {
    this.loadList();
  },
};
</script>
