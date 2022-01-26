<template>
  <div class="row">
    <div v-if="account.id" class="col-md-12 p-5">
      <div class="card">
        <table>
          <tr>
            <th>NAME</th>
            <th>CREATED</th>
          </tr>
          <tr v-for="p in projects" :key="p.id">
            <td>
              <router-link :to="{ name: 'Project', params: { id: p.id } }">{{
                p.name
              }}</router-link>
            </td>
            <td>{{ p.createdAt }}</td>
            <!-- Need to format this so not raw data -->
          </tr>
        </table>
      </div>
    </div>
    <div v-else>
      <p>LOG IN HERE</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { projectsService } from "../services/ProjectsService"
import { onMounted } from '@vue/runtime-core';
import Pop from '../utils/Pop';
export default {
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAllProjects()
      } catch (error) {
        Pop.toast(error.message, "error")
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects)
    }
      ;
  }

}
</script>

<style>
.card {
  min-height: 80vh;
}
</style>