<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="authList"
            :check-strictly="true"
            show-checkbox
            :default-checked-keys="checkedNode"
            node-key="roleId"
            :props="{ label: 'name', children: 'roleList' }"
        ></el-tree>
        <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
    </div>
</template>
<script lang="ts" setup>
interface IAuth {
    name: string; // 权限名称
    roleId: number; // 角色Id
    roleList?: IAuth[]; // 角色列表
    viewRole?: string;
}
const treeRef = ref<any>(null);
let authList = ref<IAuth[]>([]);
const checkedNode = ref<number[]>([]);
const route = useRoute();
const { query } = route;
if (Array.isArray(query.auth)) {
    console.log(query.auth);
    let auth = query.auth.map(Number);
    checkedNode.value = auth;
}
onMounted(() => {
    getAuthList();
});

function getAuthList() {
    authList.value = [
        {
            name: '项目列表',
            roleId: 1,
            viewRole: '',
            roleList: [
                {
                    name: '项目详情',
                    roleId: 4,
                    viewRole: '',
                    roleList: [
                        {
                            name: '审核',
                            roleId: 5
                        }
                    ]
                },
                {
                    name: '查看',
                    roleId: 2
                },
                {
                    name: '删除',
                    roleId: 3
                }
            ]
        },
        {
            name: '工程列表',
            roleId: 6,
            viewRole: '',
            roleList: [
                {
                    name: '工程详情',
                    roleId: 9,
                    viewRole: '',
                    roleList: [
                        {
                            name: '修改',
                            roleId: 10
                        }
                    ]
                },
                {
                    name: '查看',
                    roleId: 7
                },
                {
                    name: '删除',
                    roleId: 8
                }
            ]
        },
        {
            name: '用户管理',
            roleId: 11,
            viewRole: '',
            roleList: [
                {
                    name: '删除',
                    roleId: 14,
                    viewRole: ''
                },
                {
                    name: '查看',
                    roleId: 12
                },
                {
                    name: '修改',
                    roleId: 13
                }
            ]
        },
        {
            name: '角色管理',
            roleId: 15,
            viewRole: '',
            roleList: [
                {
                    name: '角色删除',
                    roleId: 17,
                    viewRole: ''
                },
                {
                    name: '查看',
                    roleId: 18
                },
                {
                    name: '修改',
                    roleId: 16
                }
            ]
        }
    ];
}

function onChangeAuth() {
    const selectedTreeNode = treeRef.value.getCheckedNodes();
    console.log('selectedTreeNode=', selectedTreeNode);
}
</script>
