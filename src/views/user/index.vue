<template>
    <div>
        <el-form :inline="true" class="search-form" :model="searchData">
            <el-form-item label="用户名称">
                <el-input v-model="searchData.nickName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="用户角色">
                <el-select v-model="searchData.role" class="m-2" size="large">
                    <el-option :key="0" label="全部" value="0"></el-option>
                    <el-option
                        v-for="item in roleWidthAuthList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchUser">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="userList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180" />
            <el-table-column prop="nickName" label="用户昵称" width="180" />
            <el-table-column prop="role" label="用户角色">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" link type="primary" size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑用户的弹窗-->
        <!-- <el-dialog v-model="editShow">
            
        </el-dialog> -->
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { IUser, IQueryUser, IRoleWidthAuth, IUserEdit } from '@/types/common';

const searchData = reactive<IQueryUser>({
    nickName: '',
    role: 0
});

// 角色权限列表
let roleWidthAuthList = ref<IRoleWidthAuth[]>([]);
// 用户列表
let userList = ref<IUser[]>([]);

// 编辑用户弹框是否显示
let editShow = ref(false);

let editUser = reactive<IUserEdit>({
    id: 0,
    nickName: '',
    role: [],
    userName: ''
});
// 查询用户
function handleSearchUser() {
    let res: IUser[] = [];
    if (searchData.nickName || searchData.role) {
        if (searchData.nickName) {
            res = userList.value.filter((item) => {
                return item.nickName.indexOf(searchData.nickName) != -1;
            });
        }
        if (searchData.role) {
            res = searchData.nickName ? res : userList.value;
            res = res.filter((item) => {
                return item.role.find((value) => {
                    return value.role == searchData.role;
                });
            });
        }
    } else {
        res = userList.value;
    }
    userList.value = res;
}

function handleEditUser(row: IUser) {}

// watch 监听
watch([() => searchData.nickName, () => searchData.role], () => {
    if (searchData.nickName == '' || searchData.role == 0) {
        getUserList();
    }
});

function getUserList() {
    userList.value = [
        {
            id: 1,
            nickName: '张三',
            userName: '张三',
            role: [
                {
                    role: 1,
                    roleName: '管理员'
                },
                {
                    role: 2,
                    roleName: '普通用户'
                }
            ]
        },
        {
            id: 2,
            nickName: '李四',
            userName: '李四',
            role: [
                {
                    role: 1,
                    roleName: '管理员'
                }
            ]
        },
        {
            id: 3,
            nickName: '王五',
            userName: '王五',
            role: [
                {
                    role: 2,
                    roleName: '普通用户'
                }
            ]
        }
    ];
}

function getRoleList() {
    roleWidthAuthList.value = [
        {
            roleName: '管理员',
            roleId: 1,
            authority: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16]
        },
        {
            roleName: '普通用户',
            roleId: 2,
            authority: [1, 3, 4, 6, 7, 8, 9, 11, 12, 13]
        }
    ];
}

onMounted(() => {
    getUserList();
    getRoleList();
});
</script>
<style lang="less" scoped>
.search-form {
    padding: 10px 0 0 10px;
}

.w192 {
    width: 192px;
}
</style>
