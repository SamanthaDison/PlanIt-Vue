<template>
    <div class="col-md-8">

<div class="card">
    <div class="row d-flex">
<div class="col-6">

</div>

<div class="col-6">

</div>
    </div>

    <div class="row">

        <Task/>

    </div>

</div>
    </div>
</template>


<script>
import { AppState } from '../AppState'


export default {
    props: { sprint: {type: Object, required: true} },
    setup(props){
       
        return {
        sprints: computed(() => AppState.sprints)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>