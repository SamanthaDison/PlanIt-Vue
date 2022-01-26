<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
     <img class="planetImg" src="https://www.freeiconspng.com/thumbs/planet-icon/planet-icon-8.png" alt="">
      </div>
      <div  class="d-flex flex-column align-items-center" >
        <router-link :to="{ name: 'Home' }" class="btn lighten-30">
            <h2 class="planItText">Plan-It</h2>
          </router-link>
    </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'Projects' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            My Projects
          </router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="
            btn
            selectable
            text-success
            lighten-30
            text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-success lighten-30">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>

.planetImg {
  height: 80px;
}


.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.navbar {
  background: rgb(226, 185, 238);
  background: radial-gradient(circle, #dfaeee 0%, #79d0f3 100%);
}
</style>
