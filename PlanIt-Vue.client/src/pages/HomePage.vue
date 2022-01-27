<template>
  <div class="row bg-row">
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
            <td>{{ new Date(p.createdAt).toLocaleString() }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div
      v-else
      class="
        home
        flex-grow-1
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <div class="home-card p-5 rounded shadow elevation-5 mt-5">
        <img
          src="https://www.freeiconspng.com/thumbs/planet-icon/planet-icon-8.png"
          alt="PlanIt Icon"
          class="rounded-circle"
        />
        <h3 class="my-5 text-white p-3 rounded text-center">
          Welcome to Plan-It! <br />
          Please Log In To Get Started
        </h3>
        <button
          class="btn selectable text-white text-uppercase fs-3"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { projectsService } from "../services/ProjectsService"
import { onMounted } from '@vue/runtime-core';
import { AuthService } from '../services/AuthService';
import Pop from '../utils/Pop';
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
    }
      ;
  }

}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    background: rgba(169, 194, 237, 0.5);
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-row {
  min-height: 100vh;
  background-image: url("https://cutewallpaper.org/21/galaxy-gif-background/Galaxy-Clouds-Tumblr-Free-Blue-Hipster-Backgrounds-With-Cute-.gif");
  background-position: center;
  background-size: cover;
}
.card {
  min-height: 80vh;
}
</style>