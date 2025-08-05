<template>
    <div class="header">
        <div class="flex-center">logo区域</div>
        <div class="flex-grow"></div>
        <div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user>{{ username }}</div>
        <div class="flex-center m05 color-dark-black setting" @click="settingHandle">
            <i-ep-setting></i-ep-setting>
        </div>
    </div>
    <el-drawer v-model="showSetting" :show-close="false" :with-header="false" size="300">
        <div class="setting-header">
            <h2>项目配置</h2>
            <i-ep-close @click="closeSetting"></i-ep-close>
        </div>
        <div class="out">
            <el-button type="primary" @click="logout">退出</el-button>
        </div>
    </el-drawer>
</template>
<script lang="ts" setup>
import { useUserStoreHook } from '@/store/user';

const userStore = useUserStoreHook();
let username = userStore.username;
const router = useRouter();
let showSetting = ref(false);

function settingHandle() {
    showSetting.value = true;
}
function closeSetting() {
    showSetting.value = false;
}
function logout() {
    sessionStorage.removeItem('userInfo');
    router.push('/login');
}
</script>
<style lang="less" scoped>
.header {
    display: flex;
    padding: 0 15px;
    width: 100%;
    height: 60px;
    box-shadow: 0 0 20px rgb(195 223 252 / 40%);

    .menu {
        width: max-content;
        height: 100%;
    }

    .el-menu--horizontal {
        border-bottom: none;
    }
}

.setting {
    cursor: pointer;
}

.setting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: var(--lxf-color-dark-black);
}

.out {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
