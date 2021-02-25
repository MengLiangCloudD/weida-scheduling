<template>
    <div>
        <Header :title="title"></Header>
        <div class="title">
            <Input v-model="name" placeholder="请输入姓名" style="width: 300px;margin-right:20px" />
            <Button type="primary" @click="serchList">搜索</Button>

        </div> 
        <div class="content">
             <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div class="bottom">
            <Page :total="allYer"  @on-change="changeSize"/>
        </div>
    </div>
</template>

<script>
import Header from './../views/header';
import http from './../utils/http';
    export default {
        components: {
            Header
        },
        data() {
            return {
                name:'',
                title: '调查信息',
                  columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '民族',
                        key: 'antion'
                    },
                    {
                        title: '身份证号',
                        key: 'idCard'
                    },
                    {
                        title: '住址',
                        key: 'adress'
                    },
                    {
                        title: '联系电话',
                        key: 'tel'
                    },
                    {
                        title: '就诊时间',
                        key: 'regTime'
                    },
                    {
                        title: '工作单位',
                        key: 'company'
                    },
                    {
                        title: '就诊科室',
                        key: 'deptName'
                    },
                    {
                        title: '是否发热',
                        key: 'clinic'
                    },
                    {
                        title: '是否做核酸检测',
                        key: 'detection'
                    },
                    {
                        title: '核酸结果',
                        key: 'detResult'
                    },
                    {
                        title: '未做核酸原因',
                        key: 'detReson'
                    },
                    {
                        title: '是否来自中高风险地区',
                        key: 'higAdress'
                    },
                    {
                        title: '是否去过中高风险地区',
                        key: 'higRisk'
                    },
                ],
                data1: [

                ],
                allYer:0,
                pageSize:1,
                currentPage:10
            }
        },
        created(){
            this.selectList()
        },
        methods:{
            async selectList(){
                var url = "question/list";
                var name = this.name;
                var pageSize = this.pageSize;
                var currentPage = this.currentPage;
                var data = {
                    name,pageSize,currentPage
                };
                var res = await http.post(this, url, data);
                if (res.code === '0') {
                    this.allYer = res.data.total
                    var list = res.data.list;
                    this.data1 = list;
                }
            },
            changeSize(e){
                this.pageSize = e;
                this.selectList()
            },
            serchList(){
                 this.pageSize = 1;
                 this.selectList();
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{
    margin: 20px;
}
.title{
    padding: 20px 20px 0 20px;
}
.bottom{
    margin: 20px auto;
    text-align: center;
}
</style>