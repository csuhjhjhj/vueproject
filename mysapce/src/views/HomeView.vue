<template>
   <!--Content是一个共用组件，放到外面components/ContentBase下面-->
    <ContentBase>
      首页
       
    </ContentBase>



</template>

<script>
// @ is an alias to /src
import ContentBase from '../components/ContentBase'

export default {
  name: 'HomeView',
  //在上面的template里面会用到哪些其他的组件
  components: {
    ContentBase,

  }
}
</script>


<style scoped>

</style>
