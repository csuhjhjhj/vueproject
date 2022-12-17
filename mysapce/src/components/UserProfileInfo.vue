<template>
     <!--card card-body这两个类是一个卡片-->
     <div class="card">
        <div class="card-body">
            <div class="row">
        <div class="col-3 img-field">
            <img  :src ="user.photo" class="img-fluid">
            <!--src前面加上冒号表示后面的是一个变量user.photo是一个变量而不是一个字符串-->
        </div>
        <div class="col-9">
            <!--fullName是33行的fullName-->
            <div class="username">{{user.username}}</div>
            <div class="fans">粉丝:{{user.followerCount}}</div>
            <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm">+关注</button>
            <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
        </div>
    </div>
        </div>
     </div>



</template>
<script>
// import { computed } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex'

export default {
    name : "UserProfileInfo",
    props:{
        user:{
            type:Object,
            required:true,
        }
    },
    setup(props,context){
        // let fullName = computed (() => props.user.lastname+ ' '+ props.user.firstname);
        const store = useStore();
        const follow = () =>{
           
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data:{
                    target_id: props.user.id,
                },
                headers:{
                    'Authorization':"Bearer "+store.state.user.access,
                    //注意区别一下authorization和authorication的区别
                },
                success(resp){
                    if(resp.result === "success")
                    {  
                        context.emit('follow');
                    }
                }

            })

      
        }
        const unfollow = () =>{

            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data:{
                    target_id: props.user.id,
                },
                headers:{
                    'Authorization':"Bearer "+store.state.user.access,
                },
                success(resp){
                    if(resp.result==="success"){
                         context.emit("unfollow");
                    }
                }

            })

  
        }
        
        return {
            // fullName,
            follow,
            unfollow
        }
    }
}

</script>


<style scoped>
img{
    border-radius:50%;
    /* max-width: 100%;
    height: auto; */
}
.username{
    font-weight: bold;
}
.fans{
    font-size: 12px;
    color:gray;
}
button{
    padding:2px 4px;
    font-size: 12px;
}
.img-field{
    display:flex;
    flex-direction:column;
    justify-content: center;
}

</style>