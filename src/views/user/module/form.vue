<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="校区" prop="campus">
                        <el-input v-model="form.campus" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="信息" prop="info">
                        <el-input v-model="form.info" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="parse" prop="parse">
                        <el-input v-model="form.parse" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="手机号" prop="phone">
                        <el-input v-model="form.phone" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="QQ" prop="qqnum">
                        <el-input v-model="form.qqnum" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="注册时间" prop="stamp">
                        <el-input v-model="form.stamp" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="useful" prop="useful">
                        <el-input v-model="form.useful" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="微信号" prop="vxnum">
                        <el-input v-model="form.vxnum" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/user'
    import axios from "axios";
    export default {
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
            sup_this: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                loading: false, dialog: false,
                form: {
                    _id: '',
                    campus: '',
                    email: '',
                    info: '',
                    parse: '',
                    phone: '',
                    qqnum: '',
                    stamp: '',
                    useful: '',
                    vxnum: ''
                },
                rules: {
                        _id: [
                            {required: true, message: '_id不能为空', trigger: 'blur'}
                        ],
                        campus: [
                            {required: true, message: '校区不能为空', trigger: 'blur'}
                        ],
                        email: [
                            {required: true, message: '邮箱不能为空', trigger: 'blur'}
                        ],


                        phone: [
                            {required: true, message: '手机号不能为空', trigger: 'blur'}
                        ],




                },
                options:[]
            }
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            doSubmit() {
                this.loading = true
                if (this.isAdd) {
                    this.doAdd()
                } else this.doEdit()
            },
            doAdd() {
                var sql = "db.collection('user').add({data: [?]})";
                delete this.form._id
                this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
                 this.dealForm(this.form)
                sql = sql.replace("?", JSON.stringify(this.form));
                this.params = { sql: sql, type: "add" };
                axios.post("http://localhost:3000/api/base/vx", this.params).then(res => {
                    this.resetForm()
                this.$notify({
                    title: '添加成功',
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
                this.$parent.$parent.init()
            }).
                catch(err => {
                    this.loading = false
                console.log(err.response.data.message)
            })
            },
            doEdit() {
                var sql = "db.collection('user').doc('?').update({data: ?})";
                this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
                this.dealForm(this.form)
                sql = sql
                        .replace("?", this.form._id)
                        .replace("?", JSON.stringify(this.form));
                this.params = { sql: sql, type: "update" };
                axios.post("http://localhost:3000/api/base/vx", this.params).then(res => {
                    this.resetForm()
                this.$notify({
                    title: '修改成功',
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
                this.sup_this.init()
            }).
                catch(err => {
                    this.loading = false
                console.log(err.response.data.message)
            })
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
                this.form = {
                _id: '',
                campus: '',
                email: '',
                info: '',
                parse: '',
                phone: '',
                qqnum: '',
                stamp: '',
                useful: '',
                vxnum: ''
            }
            },
            dealForm(form){
                if (form.info) {
                    form.info=JSON.parse(form.info)
                }
                if (form.campus) {
                    form.campus=JSON.parse(form.campus) 
                }
                
                
            }

        }
    }
</script>

<style scoped>

</style>
