<template>
  <form @submit.prevent="createSprint()">
    <div class="row justify-content-center align-items-centermy-3">
      <div class="col-md-12 mb-2">
        <label for="Sprint Name" class="">Sprint Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Task Name..."
          required
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
import { sprintsService } from "../services/SprintsService"
import Pop from '../utils/Pop';

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    return {
      editable,

      async createTask() {
        try {
          await sprintsService.createSprint(route.params.id, editable.value);
          editable.value = {};
          Pop.toast("New Sprint Created!");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error);
        }
      },
    };
  },

}
</script>

<style>
</style>