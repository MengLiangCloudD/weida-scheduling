<template>
    <div class="left">
        <div class="left_list">
            <div :class="item.start===0?'item':'item item1'" v-for="(item,index) in depList" :key="index"
                 @click="clickUpdateDep(item)">
                {{item.depName}}
            </div>
        </div>
    </div>
</template>

<script>
    import http from './../utils/http';

    export default {
        data() {
            return {
                depList: [
                    {
                        depName: "",
                        depCode: "0",
                        start: "0"
                    }
                ]
            }
        },
        created() {
            this.getdepList();
        },
        mounted() {

        },
        methods: {
            clickUpdateDep(item) {
                var list = this.depList;
                for (var i = 0; i < list.length; i++) {
                    list[i].start = 0;
                    if (list[i].depCode === item.depCode) {
                        list[i].start = 1;
                    }
                }
                this.depList = list;
                //不同于react自动更新页面 改变数据重新渲染需要调用新方法
                this.$forceUpdate();

                //展示右侧内容
                this.$emit("getWeek", item.depCode);
            },

            //查询所有科室
            async getdepList() {
                var url = "dept/query";
                var data = {};
                var res = await http.post(this, url, data);
                if (res.body.code === '0') {
                    var list = res.body.data;
                    for (var i = 0; i < list.length; i++) {
                        list[i].start = 0;
                    }
                    this.depList = list;
                }
            },


        }
    }
</script>

<style lang="scss" scoped>
    .left {
        width: 18%;
        min-width: 150px;
        height: 100%;
        position: absolute;
        border-right: 1px solid rgb(238, 238, 238);
        left: 0;
        top: 0;
    }

    .left_list {
        width: 100%;
        height: calc(100% - 10px);
        padding-top: 10px;
        overflow: auto;
    }

    .item {
        width: 100%;
        height: 60px;
        font-size: 26px;
        border-bottom: 1px solid rgb(238, 238, 238);
        text-align: center;
        line-height: 60px;
        color: #555;
        cursor: pointer;
    }

    .item1 {
        background: #3aaa6e;
        color: #fff;
    }

    /* .left_list::-webkit-scrollbar { width: 0 !important } */
</style>
