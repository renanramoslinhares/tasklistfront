<template>
  <div>
    <SearchComponent @search="(value) => (search = value)" />
    <LoadingComponent v-if="isLoading" />
    <v-list flat subheader three-line v-else>
      <v-subheader>Lista de tarefas</v-subheader>
      <v-list-item-group v-model="settings" multiple active-class="">
        <v-list-item v-if="!isLoading && !filtredTasks.length" >
          <v-list-item-content>
            <v-list-item-title>
              Ops. Não há tarefas.
            </v-list-item-title>
            <v-list-item-subtitle>
              Clique no botão "mais" para criar uma.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="task in filtredTasks"
          :key="task.id"
          v-else
        >
          <v-list-item-action>
            <div class="pt-2">
              <v-checkbox
                :ripple="false"
                class="v-btn v-btn--icon v-btn--round theme--light v-size--default"
                :input-value="Boolean(task.status === 'done')"
                @click="updateStatus(task)"
              ></v-checkbox>
            </div>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              :class="task.status === 'done'
                ? 'text-decoration-line-through' : ''"
            >
              {{ task.title }}
            </v-list-item-title>
            <v-list-item-subtitle
              :class="task.status === 'done'
                ? 'text-decoration-line-through text--disabled' : ''"
            >
              {{ task.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <div class="pt-2">
              <v-btn icon @click="$emit('idEdit', task.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import { updateById} from "@/services/taskService";
import LoadingComponent from "@/components/LoadingComponent";
import SearchComponent from "@/components/SearchComponent";

export default {
  name: "ListComponent",
  data: () => ({
    search: "",
    settings: [],
  }),
  props:{isLoading: {type: Boolean, default: false}, tasks: Array},
  components: { LoadingComponent, SearchComponent },
  computed: {
    filtredTasks() {
      return this.tasks.filter(
        (task) =>
          task.title.toUpperCase().indexOf(this.search.toUpperCase()) > -1 ||
          task.description.toUpperCase().indexOf(this.search.toUpperCase()) > -1
      );
    },
  },
  methods: {
    updateStatus(task) {
      const reverseStatus = {done: 'open', open: 'done'}[task.status];
      const index = this.tasks.findIndex((element)=>task.id === element.id);
      this.tasks[index].status = reverseStatus;
      updateById(task.id, {status: reverseStatus}).then((resp) => {
      console.log("🚀 ~ file: ListComponent.vue ~ line 85 ~ updateStatus ~ resp", resp);
        const message = resp.success ? 'Salvo com sucesso' : 'Erro'+resp.message;
        this.$emit('alert', message);
      });
    },    
  },
};
</script>
