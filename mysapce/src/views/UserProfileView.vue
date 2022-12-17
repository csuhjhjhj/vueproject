<template>
    <ContentBase>
      <!--这里看下视频是有比较容易的写法写下面的这些东西-->
        <div class="row">
          <div class="col-3">
            <!--跨组件传递消息-->
            <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user"/>
            <UserProfileWrite v-if = "is_me" @post_a_post = "post_a_post"/>
          </div>
          <div class="col-9">
            <UserProfilePosts  :user="user" :posts = "posts" @delete_a_post = "delete_a_post"/>
          </div>
        </div>
    </ContentBase>    
</template>
  
  <script>
  // @ is an alias to /src
import ContentBase from '../components/ContentBase.vue'
import UserProfileInfo from '../components/UserProfileInfo.vue'
import UserProfilePosts from '../components/UserProfilePosts.vue'
import UserProfileWrite from '../components/UserProfileWrite.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import {useStore} from 'vuex'
import {computed} from 'vue'


  export default {
    name: 'UserProfileView',
    //在上面的template里面会用到哪些其他的组件
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup(){
      
      const store = useStore();
      const route = useRoute();
      // console.log(route.params.userId);
      const userId = parseInt(route.params.userId);
      const user = reactive({
       

      });
      const posts = reactive({
         
      })
      
      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type  :"GET",
        data:{
          user_id:userId,
        },
        headers:{
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp){

          user.id = resp.id;
          user.username = resp.username;
          user.photo = resp.photo;
          user.followerCount = resp.followerCount;
          user.is_followed = resp.is_followed;
          // console.log(resp);
        }
      })

      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/post/",
        type:"GET",
        data:{
          user_id :userId,
        },
        headers:{
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp){
          posts.count = resp.length;
          posts.posts = resp;
        }
        
      });


      const follow= () =>{
        if(user.is_followed)return;
        user.is_followed = true;
        user.followersCount ++ ;

      }
      const unfollow = () =>{
        if(!user.is_followed)return;
        user.is_followed = false;
        user.followersCount -- ;
      }
      const post_a_post = (content)=>{
        posts.count++;
        posts.posts.unshift({
          id:posts.count,
          userId:1,
          content:content,
        })
      }
      const delete_a_post = post_id =>{
        posts.posts = posts.posts.filter(post => post.id !== post_id);//将里面每条帖子不等于要删除帖子id的帖子都保存下来
        posts.count = posts.posts.length;
      }

      const is_me = computed(() => userId === store.state.user.id);//判断当前页面是不是自己
      

      return { 
        user:user,
        follow,
        unfollow,
        posts,
        post_a_post,
        delete_a_post,
        is_me
      }
    }
  }
  </script>
  
  
  <style scoped>
  
  </style>
  