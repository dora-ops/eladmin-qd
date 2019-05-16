<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
                       
                <el-form-item
                        label="实验室名称"
                        prop="name">
                        <el-input v-model="form.name" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="编号"
                        prop="number">
                        <el-input v-model="form.number" style="width: 370px;"/>
                </el-form-item>
                <!-- <el-form-item
                        label="创建时间"
                        prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                </el-form-item> -->
                <el-form-item
                        label="建筑物名称"
                        prop="build">
                        <el-input v-model="form.build" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="所属校区"
                        prop="school">
                        <el-input v-model="form.school" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="容纳人数"
                        prop="hold">
                        <el-input v-model="form.hold" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="所属实验中心编号"
                        prop="centerId">
                        <el-input v-model="form.centerId" style="width: 370px;"/>
                        <!-- <el-select v-model="form.centerId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select> -->
                </el-form-item>
                <el-form-item
                        label="实验类别"
                        prop="type">
                        <el-input v-model="form.type" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="联系电话"
                        prop="tel">
                        <el-input v-model="form.tel" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="主要承担课程"
                        prop="chargeCourse">
                        <el-input v-model="form.chargeCourse" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="面向专业"
                        prop="major">
                        <el-input v-model="form.major" style="width: 370px;"/>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/labRoom'

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
            id: '',
            name: '',
            number: '',
            createTime: '',
            build: '',
            school: '',
            hold: '',
            centerId: '',
            type: '',
            tel: '',
            chargeCourse: '',
            major: ''
        },
            rules: {
                    id: [
                        {required: true, message: 'ID', trigger: 'blur'}
                    ],


                    createTime: [
                        {required: true, message: '创建时间', trigger: 'blur'}
                    ],








            }
        ,
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
                add(this.form).then(res => {
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
                edit(this.form).then(res => {
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
                id: '',
                name: '',
                number: '',
                createTime: '',
                build: '',
                school: '',
                hold: '',
                centerId: '',
                type: '',
                tel: '',
                chargeCourse: '',
                major: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
