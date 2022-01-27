<template>
<div class="row ">



  <div class="col-1">
    <div class="position-fixed my-3">

<div class="selectable bg-dark my-1">
<i class=" fs-1 mdi mdi-cat p-4 "></i>
</div>

<div class="selectable bg-secondary">
<i class="fs-1 mdi mdi-cat p-4"></i>
</div>


    </div>

  </div>
  <div class="col-1">

  </div>
  <div class="col-9 mt-4">
  <div>
  <h1>Project Name</h1>
 <p>Project Description</p>
 </div>
 <div class="d-flex justify-content-between">
  <h1>Sprints</h1>
 <button class="mx-5">Add Sprint</button>
 </div>
   </div>
   <div class="col-1">

   </div>
    
 <div class="row"> 

  <Sprint v-for="s in sprints" :key="s.id" :sprint="s"/>
</div>

</div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { sprintsService } from "../services/SprintsService";
import { AppState } from "../AppState";

export default {
  setup() {
     const route = useRoute();
     watchEffect(async () => {
       if (route.name == "Project")
        await sprintsService.getAll(route.params.id);
     })
    return {
      sprints: computed(() => AppState.sprints)
    };
  }

}
</script>

<style>
</style>