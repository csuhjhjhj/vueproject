<template>
    <div class="home">
    <!-- container是一个bootstrap中实现好的插件，可以让我们响应式的调整 -->
    
    <div class="container">
      <div class="card">
      <div class="card-body">
         <slot></slot>
      </div>
     </div>  
    </div>
  
  </div>


</template>


<script>

    export default {
       name : 'ContentBase',

    }

</script>

<style scoped>
  .container{
    margin-top: 20px;
  }

</style>