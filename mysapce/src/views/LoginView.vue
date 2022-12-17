<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <!-- submit.prevent中的prevent可以去掉是另一种情况 -->
                <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model= "username" type="text" class="form-control" id="username" >
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div>
                <div class = "error-message">{{error_message}}</div>

                <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
        
    </ContentBase>    
</template>
  
  <script>
  // @ is an alias to /src
  import ContentBase from '../components/ContentBase.vue'
//   响应式变量使用ref或者reactive
  import { ref } from 'vue';
  import { useStore } from 'vuex'
  import router from '@/router/index'
  //@这个符号一般默认定义到src目录
  export default {
    name: 'LoginView',
    //在上面的template里面会用到哪些其他的组件
    components: {
        ContentBase,
  
    },
    setup(){
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');


        const login = () => {
            error_message.value="";

            // console.log(username.value,password.value);
            store.dispatch("login",{
                username:username.value,
                password:password.value,
                success(){
                    router.push({name:'userlist'});
                },
                error(){
                    error_message.value = "用户名或密码错误";
                }
            });
        }

        return { 
            username:username,
            password:password,
            error_message,
            login
        }
    }
  }
  </script>
  
  
  <style scoped>
  
  button{ 
    width:100%;

  }
  .error-message{
    color:red;
  }
  </style>
  