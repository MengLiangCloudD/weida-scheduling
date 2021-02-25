<template>
    <div class="center">
        <div class="title" v-show="dateFlag">
            <label>请选择排班日期：</label>
            <Select v-model="selected" style="width:200px">
                <Option v-for="(item,index) in weekList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="content_info" v-show="aDocFlag">
            <div class="content_biao">
                <span>所有医生列表:</span><br>
                <span>(点击加入排班)</span>
            </div>
            <div class="content_right_content">
                <div class="content_right_itemList">
                    <div v-for="(item,index) in docList" :key="index" class="content_item"
                         @click="clickUpdateDoctorList(item)">
                        {{item.dcName}}
                    </div>
                </div>
            </div>
        </div>
        <div class="content_info" v-show="sDocFlag">
            <div class="content_biao">
                <span>已排班医生列表:</span><br>
                <span></span>
            </div>
            <div class="content_right_content">
                <div class="content_right_itemList">
                    <div v-for="(item,index) in schedList" :key="index" class="content_item"
                         @click="clickUpdateRankDocList(item)">
                        {{item.dcName}}({{item.fee}}元)
                    </div>
                </div>
            </div>
        </div>
        <Modal
                v-model="modal1"
                title="选择医师服务费"
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <div class="div">
                <p v-for="(item,index) in feeList" :key="index" @click="chenge(item.rtId,item.cPrice)">
                    <input type="radio" name="paixu" :id="item.rtId" :value="item.rtId" v-model="checIndex">
                    <label :for="item.rtId" style="cursor:pointer">{{item.rtDes}} : {{item.cPrice}}元</label>
                </p>
            </div>
        </Modal>

        <Modal
                v-model="modal2"
                title="操作提示"
                @on-ok="msgOk"
                @on-cancel="cancel">
            <p>确认要移除此医生排班吗?</p>
        </Modal>
    </div>
</template>

<script>
    import http from './../utils/http';

    export default {
        data() {
            return {
                depCode: 0,
                //14天日期列表
                weekList: [],

                docList: [{//所有医生列表
                    insCode: "",
                    dcName: "",
                    dcCode: "",
                    depName: "",
                    depCode: "",
                }],

                schedList: [{//已排版医生列表
                    id: "",
                    dcCode: "",
                    dcName: "",
                    depCode: "",
                    insCode: "",
                    deptName: "",
                    scheDate: "",
                    fee: "",
                }],

                rankDoctorName: '',
                dcItem: null,
                modal1: false,
                modal2: false,

                feeList: [{//挂号费用列表
                    rtId: "1",
                    rtDes: "普通挂号费（元）",
                    cPrice: "5",
                }, {//挂号费用列表
                    rtId: "2",
                    rtDes: "专家挂号费（元）",
                    cPrice: "10",
                }],

                //默认选中的值
                checIndex: 0,
                rtId: 0,
                cPrice: 100,
                dateFlag: false,
                aDocFlag: false,
                sDocFlag: false,
                id: null,
                selected: null
            }
        },
        created() {


        },
        mounted() {
            //this.getDoc();
            //this.getFee();
        },
        methods: {

            //点击已排版列表的医生
            clickUpdateRankDocList(item) {
                //调用移除排班接口
                this.deleteSchedling(item.id);
                //重新渲染已排版列表

            },
            //点击所有医生列表的医生
            clickUpdateDoctorList(item) {
                if (this.selected == null) {
                    alert("请选择排班日期");
                    return;
                }
                this.dcItem = item;
                this.modal1 = true;
            },
            //弹窗确定的回调
            ok() {
                this.addSchedling();
                //this.$Message.info('Clicked ok');
            },
            //弹窗取消的回调
            cancel() {
                //this.$Message.info('Clicked cancel');
            },
            msgOk() {
                this.deleteSchedApi();
            },
            //弹窗单选框的方法
            chenge(rtId, cPrice) {
                this.checIndex = rtId;
                this.cPrice = cPrice;
                this.rtId = rtId;
            },

            //获取日期
            getWeek(depCode) {
                this.getWeekList(depCode, this)
            },
            async getWeekList(depCode, that) {
                console.log(this)
                that.weekList = [];
                that.selected = null;
                that.docList = [];
                that.sDocFlag = false;
                var url = "sched/currentWeekList";
                var data = {};
                var res = await http.post(that, url, data);
                if (res.code === '0') {
                    var list = res.data.thisWeek;
                    var weekList = list.concat(res.data.nextWeek);
                    for (var i = 0; i < weekList.length; i++) {
                        var obj = {
                            label: weekList[i],
                            value: weekList[i]
                        };
                        that.weekList.push(obj);
                    }
                }
                that.depCode = depCode;
                //获取当前科室所有医生
                that.getDoc(depCode);
                that.getFee();
                that.dateFlag = true;
                that.aDocFlag = true;
            },

            //获取所有医生
            async getDoc(depCode) {
                var url = "doctor/query";
                var data = {
                    depCode: depCode
                };
                var res = await http.post(this, url, data);
                if (res.body.code === '0') {
                    this.docList = res.body.data;
                } else {
                    this.docList = [];
                }
            },

            //获取已排班医生
            async getSchedDoc() {
                var url = "sched/list";
                var data = {
                    scheDate: this.selected,
                    depCode: this.depCode
                };
                var res = await http.post(this, url, data);
                if (res.code === '0') {
                    this.schedList = res.data;
                }
                this.sDocFlag = true;
            },

            //获取挂号费用
            async getFee() {
                var url = "register/getRegiFee";
                var data = {};
                var res = await http.post(this, url, data);
                if (res.body.code === '0') {
                    this.feeList = res.body.data;
                }
            },

            //添加排班接口
            async addSchedling() {
                var url = "sched/addSchedling";
                var data = {
                    dcCode: this.dcItem.dcCode,//医生code
                    dcName: this.dcItem.dcName,//医生姓名
                    depCode: this.dcItem.depCode,//科室code
                    deptName: this.dcItem.depName,//科室名称
                    scheDate: this.selected,//日期
                    fee: this.cPrice,//费用
                    rtId: this.rtId,//费用id
                    insCode: this.dcItem.insCode,//"专家"
                };
                var res = await http.post(this, url, data);
                if (res.code === '0') {
                    this.$Message.info('排班成功');
                    this.getSchedDoc();
                } else {
                    alert(res.msg)
                }
            },

            //移除排班函数
            async deleteSchedling(id) {
                this.modal2 = true;
                this.id = id;
            },

            //移除排班接口
            async deleteSchedApi(id) {
                var url = "sched/delete";
                var data = {
                    id: this.id
                };
                var res = await http.post(this, url, data);
                if (res.code === '0') {
                    this.$Message.info('移除成功');
                    this.getSchedDoc();
                } else {
                    alert(res.msg)
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .center {
        max-width: calc(100% - 18% - 1px);
        min-width: 1000px;
        height: 10px;
        position: absolute;
        height: 100%;
        right: 0;
        /* text-align: center; */
    }

    .title {
        padding: 20px 30px;
        text-align: left;
        font-size: 16px;
        color: #222;

    }

    label {
        min-width: 150px;
        display: inline-block;
    }

    .content_info {
        padding: 0 30px 20px 30px;
        display: flex;
    }

    .content_biao {
        min-width: 150px;
        font-size: 16px;
        color: #222;
        flex: 1;
        padding-top: 39px;
    }

    .content_right_content {
        width: calc(100% - 150px);
        min-width: 950px;
        min-height: 120px;
        max-height: 240px;
        border-radius: 28px;
        background: #eafcf2;
        overflow: auto;
        /* line-height: 180px; */
        font-size: 16px;
        color: #222;
        /* margin-left: 86px; */
        padding: 30px 0 0 0;
    }

    .content_right_itemList {
        display: flex;
        flex-wrap: wrap;

    }

    .content_item {
        margin-left: 40px;
        width: 120px;
        height: 60px;
        line-height: 60px;
        background: #fff;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 30px;
        cursor: pointer;
    }

    .div p {
        margin: 10px;
    }

    .div p > input {
        display: none;

    }

    .div p > label {
        position: relative;
        margin-right: 34px;
        display: block;
        line-height: 2;

        font-size: 16px;
    }

    .div p > label::before {
        display: inline-block;
        content: "";
        width: 15px;
        height: 15px;
        /* border-radius: 50%; */
        border: 1px solid rgb(219, 219, 219);
        margin-right: 6px;
        vertical-align: middle;
    }

    .div p > input:checked + label::before {
        background-color: #1989fa;
    }

    .div p > input:checked + label::after {
        display: inline-block;
        content: "";
        width: 5px;
        height: 5px;
        /* border-radius: 50%; */
        position: absolute;
        left: 5px;
        bottom: 12px;
        background-color: white;

    }
</style>
