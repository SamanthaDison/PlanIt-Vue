<template>
  <div class="row">
    <div v-if="account.id" class="col-md-12 p-5">
      <div class="card">
        <div class="d-flex justify-content-between p-4">
          <h1>My Projects</h1>
          <button>Create Project</button>
        </div>
        <div class="d-flex justify-content-around">
          <p>NAME</p>
          <p>START DATE</p>
        </div>
        <div class="text-center">PROJECTS V-FOR HERE</div>
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
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
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
