<template>
  <div class="row">
    <div class="col-1">
      <div class="position-fixed my-3">
        <div class="selectable bg-dark my-1">
          <i class="fs-1 mdi mdi-cat p-4"></i>
        </div>
        <div class="selectable bg-secondary mt-2">
          <i class="fs-1 mdi mdi-cat p-4"></i>
        </div>
      </div>
    </div>

    <div class="col-10 mt-4 px-2 ms-5" v-if="activeProject">
      <div class="card p-4">
        <div class="row">
          <div>
            <h1>
              {{ activeProject.name }}
              <i
                @click="removeProject()"
                class="mdi mdi-close selectable ps-3"
              ></i>
            </h1>

            <p>{{ activeProject.description }}</p>
          </div>
          <div class="d-flex justify-content-between pt-3">
            <h4>Sprints</h4>

            <button
              data-bs-toggle="modal"
              data-bs-target="#add-sprint"
              class="mx-5"
            >
              Add Sprint
            </button>
          </div>
          <div class="row pt-2">
            <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
  <!-- <Modal id="add-sprint">
    <template #modal-title> {{ project.name }} > Add Sprint</template>
    <template #modal-body>
      <NewSprintForm :projectId="project.id"/>
    </template>
  </Modal> -->
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { sprintsService } from "../services/SprintsService";
import { AppState } from "../AppState";
import { projectsService } from '../services/ProjectsService';
import Pop from '../utils/Pop';


export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    watchEffect(async () => {
      if (route.name == "Project")
        await projectsService.getProjectsById(route.params.id);
      await sprintsService.getAllSprints(route.params.id);
    })
    return {
      sprints: computed(() => AppState.sprints),
      activeProject: computed(() => AppState.activeProject),
      async removeProject() {
        try {
          await projectsService.removeProject(route.params.id)
          router.push({
            name: "Home"
          })
        } catch (error) {
          Pop.toast(error.message, "error")
        }
      }
    };
  }

}
</script>

<style>
</style>

