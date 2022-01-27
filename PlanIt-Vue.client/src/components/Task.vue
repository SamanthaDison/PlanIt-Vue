<template>
  <div class="col-md-12"></div>
  <div class="ps-5">
    <div class="d-flex">
      <h3>
        <input
          type="checkbox"
          :name="task.name"
          :id="task.id"
          :value="task.name"
        />
        {{ task.name }}
      </h3>
      <i
        class="mdi mdi-close ps-4 pt-1 fs-5 selectable"
        @click="removeTask(task.id)"
      ></i>
    </div>
    <div class="ps-4">
      <i class="mdi mdi-rocket-launch-outline fs-5">{{ task.weight }}</i>
      <i class="ps-5 mdi mdi-comment-text-outline fs-5">comment amount</i>
    </div>
  </div>
</template>


<script>
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Pop'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async removeTask(id) {
        try {
          await tasksService.removeTask(id)
        } catch (error) {
          Pop.toast(error.message, "error")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>