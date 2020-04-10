<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="状态" prop="status">
                        <el-input v-model="form.status" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="价格" prop="price">
                        <el-input v-model="form.price" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="备注信息" prop="notes">
                        <el-input v-model="form.notes" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="地点" prop="place">
                        <el-input v-model="form.place" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="信息" prop="bookinfo">
                        <el-input v-model="form.bookinfo" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="展位" prop="collegeid">
                        <el-input v-model="form.collegeid" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="类别" prop="kindid">
                        <el-input v-model="form.kindid" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="关键词" prop="key">
                        <el-input v-model="form.key" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="出版时间" prop="dura">
                        <el-input v-model="form.dura" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="取货方式" prop="deliveryid">
                        <el-input v-model="form.deliveryid" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="创建时间" prop="creat">
                        <el-input v-model="form.creat" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/publish'
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
                    status: '',
                    price: '',
                    notes: '',
                    place: '',
                    bookinfo: '',
                    collegeid: '',
                    kindid: '',
                    key: '',
                    dura: '',
                    deliveryid: '',
                    creat: ''
                },
                rules: {
                        _id: [
                            {required: true, message: '_id不能为空', trigger: 'blur'}
                        ],
                        status: [
                            {required: true, message: '状态不能为空', trigger: 'blur'}
                        ],
                        price: [
                            {required: true, message: '价格不能为空', trigger: 'blur'}
                        ],
                        notes: [
                            {required: true, message: '备注信息不能为空', trigger: 'blur'}
                        ],
                        place: [
                            {required: true, message: '地点不能为空', trigger: 'blur'}
                        ],


                        kindid: [
                            {required: true, message: '类别不能为空', trigger: 'blur'}
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
                var sql = "db.collection('publish').add({data: [?]})";
                delete this.form._id
                this.dealForm(this.form)
                this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
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
                var sql = "db.collection('publish').doc('?').update({data: ?})";
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
                status: '',
                price: '',
                notes: '',
                place: '',
                bookinfo: '',
                collegeid: '',
                kindid: '',
                key: '',
                dura: '',
                deliveryid: '',
                creat: ''
            }
            },
            dealForm(form){

            }

    }
    }
</script>

<style scoped>

</style>
