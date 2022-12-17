<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link a class="navbar-brand" :to="{name:'home'}">Myspace</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'userlist'}">好友列表</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" :to="{name:'userprofile',params:{userId:2}}">用户动态</router-link>
        </li> -->
      </ul>
      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <!--访问store是使用$store   就一直按着一层一层的路径去访问就可以了-->
        <li class="nav-item">
          <router-link class="nav-link"  :to="{name:'login'}">登录</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'register'}">注册</router-link>
        </li>
      </ul>

      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link
           class="nav-link"
           :to="{name:'userprofile',params:{userId: $store.state.user.id}}"
           >{{$store.state.user.username}}
        </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style = "cursor: pointer" @click="logout">退出</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>

</template>


<!-- 加完scoped之后我们在这里写的所有的css选择器不会影响其他的组件 -->
<script scoped>
import { useStore } from 'vuex';

export default {
    name :"NavBar",

    setup(){
        const store = useStore();
        const logout = () =>{
            store.commit('logout');//调用mutations里面的api的话，使用的是commit,调用的是actions里面的haul，使用的是dispatch
        };
        return {
            logout, 
        }
    }
}

</script >

