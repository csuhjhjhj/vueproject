<template>
    <ContentBase>
      <div class="card" v-for = "user in users" :key="user.id" @click="open_user_profile(user.id)">
        <div class="card-body">
            <div class="row">
              <div class="col-1 img-field">
                  <img class="img-fluid" :src="user.photo" alt="" >
              </div>
              <div class="col-11">
                  <div class="username">{{user.username}}</div>
                  <div class="follower-count">{{user.followerCount}}</div>
              </div>
            </div>
        </div>
      </div>
    </ContentBase>    
</template>
  
  <script>
  // @ is an alias to /src
  import ContentBase from '../components/ContentBase.vue'
  import $ from 'jquery';
  import { ref } from 'vue';
  import router from '@/router/index';
  import { useStore }from 'vuex';

  export default {
    name: 'UserListView',
    //在上面的template里面会用到哪些其他的组件
    components: {
        ContentBase,
  
    },
    setup(){
      const store = useStore();
      let users = ref([]);

      $.ajax({
        url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type :"get",
        success(resp){
          //如果想要修改一个ref类型的变量，需要修改它的.value类型
          users.value = resp;
        }
      });

      const open_user_profile = userId =>{
        if(store.state.user.is_login){
          router.push({
            name:"userprofile",
            params:{
              userId
            }
          })
        }else{
          router.push({
            name:"login"
          });
        }
      }

      

      return{ 
        users,
        open_user_profile
      };

    }
  }
  </script>
  
  
  <style scoped>


img{ 
  border-radius: 50%;
}

.username{
  foont-weight:bold;
  height:50%;
}
.follower-count{
  font-size:12px;
  color :grey;
  height:50%; 
}
.card{
  margin-bottom: 20px;
  cursor :pointer;
  /* 上面这行是把鼠标变成一个小手的形状 */
}
.card:hover{
  box-shadow: 2px 2px 10px lightgrey;
  /* 偏移量朝右朝下都是2像素，扩散十像素，扩散颜色是lg */
  transform: 500ms;
}
 /* 鼠标悬浮加阴影效果  */

 .img-field{
    display:flex;
    flex-direction:column;
    justify-content: center;
 }
  </style>
  