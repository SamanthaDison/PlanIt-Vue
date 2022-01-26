<template>
<div class="row ">
  <div class="col-1">
    <div class="position-fixed">

<div class="selectable bg-dark my-1">
<i class=" fs-1 mdi mdi-cat p-4 "></i>
</div>

<div class="selectable bg-secondary">
<i class="fs-1 mdi mdi-cat p-4"></i>
</div>


    </div>

  </div>
  <div class="col-10 mt-4">
  <div>
  <h1>Project Name</h1>
 <p>Project Description</p>
 </div>
 <div class="d-flex justify-content-between">
  <h1>Sprints</h1>
 <button class="mx-5">Add Sprint</button>
 </div>
   </div>
    
 <div class="row"> 

  <Sprint/>
</div>

</div>
</template>

<script>

export default {
  setup() {
    return {};
  }

}
</script>

<style>
</style>