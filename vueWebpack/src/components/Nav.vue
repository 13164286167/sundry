<template>
    <div>
        <!-- <router-link to="/">Click To HelloWorld</router-link> -->
        <div style="cursor:pointer" @click="handleClick">Click To HelloWorld</div>
    </div>
</template>
<script>
export default {
    name:"Nav",
    methods:{
        handleClick(){
            this.$router.replace({
                path:'/',
                query:{
                    msg:'这是Nav跳转后传来的参数'
                }   
            })
        },
    }
}
</script>
<style scoped>
</style>
