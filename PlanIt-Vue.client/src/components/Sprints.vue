<template>
  <div class="col-md-12 sprint-card">
    <div class="card p-2">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <div class="d-flex p-1">
            <h2>{{ sprint.name }}</h2>
            <p>task counter here</p>
          </div>
          <div class="d-flex p-1">
            <button data-bs-toggle="modal" data-bs-target="#add-task">
              Add Task
            </button>
            <p>Task Counter here</p>
          </div>
        </div>
        <div class="row">
          <p>TASKS HERE</p>
        </div>
      </div>
    </div>
  </div>
  <Modal id="add-task">
    <template #modal-title> {{ sprint.name }} > Add Task</template>
    <template #modal-body>
      <NewTaskForm :sprintId="sprint.id" />
    </template>
  </Modal>
</template>


<script>
import { AppState } from '../AppState'
import { computed, onMounted } from "@vue/runtime-core";
import Pop from '../utils/Pop';
import { tasksService } from '../services/TasksService';
import { useRoute } from 'vue-router';



export default {
  props: { sprint: { type: Object, required: true } },
  setup(props) {
    const route = useRoute();
    onMounted(async () => {
      try {
        await tasksService.getAllTasks(route.params.id)
      } catch (error) {
        Pop.toast(error.message, "error")
      }
    })
    return {
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      totalWeight: computed(() => {

        // set total variable
        // itterate over tasks
        // add tasks that are not complete to the total
        // return total
      }),
      completedTasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id && t.isCompleted))
    }
  }
}
</script>


<style lang="scss" scoped>
.sprint-card {
  min-width: 100%;
}
</style>