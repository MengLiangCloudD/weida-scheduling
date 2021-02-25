<template>
    <div>
        <div class="title">
            <div class="title_left">
                <img src="./../common/imager/39f0989f2d5b8ec637a6e261894cc18.png" alt="">
                <div >{{title}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            title:{
                type:String,
                required:true
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
.title{
    width: 100%;
    height: 100px;
    background: #3aaa6e;
    position: relative;
    line-height: 100px;
    font-size: 36px;
    color: #fff;
    font-weight: 600;
    text-align: center;
}
.fahui{
    padding-top: 49px;
    font-size: 36px;
    color: #fff;
    font-weight: 600;
}
.title_left img{
    width: 260px;
    height: 65px;
    left: 50px;
    top: 20px;
    position: absolute;
}
</style>