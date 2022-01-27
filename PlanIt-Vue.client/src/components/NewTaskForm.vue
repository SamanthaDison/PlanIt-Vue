<template>
  <form @submit.prevent="createTask()">
    <div class="row justify-content-center align-items-centermy-3">
      <div class="col-md-6 mb-2">
        <label for="Task Name" class="">Task Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Task Name..."
          v-model="editable.name"
          required
        />
      </div>
      <div class="col-md-6 mb-2">
        <label for="Task Weight" class="">Task Weight:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Task Weight..."
          v-model="editable.weight"
        />
      </div>
    </div>

    <div class="d-flex justify-content-between my-3">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn text-dark lighten-20 text-uppercase selectable"
      >
        <b> cancel </b>
      </button>
      <button type="submit" class="btn text-primary text-uppercase selectable">
        <b> submit </b>
      </button>
    </div>
  </form>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { tasksService } from "../services/TasksService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: {
    sprintId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const editable = ref({ sprintId: props.sprintId });
    return {
      editable,

      async createTask() {
        try {
          await tasksService.createTask(editable.value);
          editable.value = { sprintId: props.sprintId };
          Pop.toast("New Task Created!");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },
};
</script>

<style>
</style>