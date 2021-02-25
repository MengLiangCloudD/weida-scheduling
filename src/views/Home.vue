<template>
    <div class="home">
        <Header :title="title"></Header>
        <div class="content">
            <Left @getWeek="getWeek"></Left>
            <Content ref="mychild"></Content>
        </div>
    </div>

</template>

<script>
    import Header from './header';
    import Left from './left';
    import Content from './content';
    import http from './../utils/http';

    export default {
        components: {
            Header,
            Left,
            Content
        },
        data() {
            return {
                title: '排班管理',
            }
        },
        methods: {


            // // 方式二: 通过$on()；生命周期监听自定义事件
            // this.$refs.Left.$on('delete_todo',function(todo){
            //     this.deleteTodo(todo)
            // }),

            getWeek(depCode) {
                this.$refs.mychild.getWeek(depCode);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .home {
        min-width: 1200px;
    }

    .content {
        min-width: 1200px;
        width: 100%;
        height: calc(100% - 100px);
        position: absolute;
    }
</style>
