<template>
    <div class="wrap-content">
        <el-form :inline="true" label="名称" :model="searchData" class="search-form">
            <el-form-item>
                <el-input v-model="searchData.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.introduce" placeholder="请输入详情"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearchGoods()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" border style="width: 100%">
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"></el-table-column>
            <el-table-column prop="introduce" label="详情"></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            class="pagination"
            background
            layout="sizes, prev, pager, next"
            :total="searchData.dataCount"
            :page-size="searchData.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, computed, ref, watch } from 'vue';

// 定义接口
interface IProject {
    userId: number;
    id: number;
    title: string;
    introduce: string;
}

let productList = ref<IProject[]>([]);

let searchData = reactive({
    userId: 0,
    id: 0,
    title: '',
    introduce: '',
    currentPage: 1,
    dataCount: 0,
    pageSize: 5
});

// 查询商品
function onSearchGoods() {
    let res: IProject[] = [];
    if (searchData.title || searchData.introduce) {
        if (searchData.title) {
            res = productList.value.filter((value) => {
                return value.title.indexOf(searchData.title) != -1;
            });
        }
        if (searchData.introduce) {
            res = productList.value.filter((value) => {
                return value.introduce.indexOf(searchData.introduce) != -1;
            });
        }
    } else {
        res = productList.value;
    }
    productList.value = res;
    searchData.currentPage = 1;
    searchData.dataCount = productList.value.length;
}

// 调用接口——获取商品数据
function fetchProductList() {
    productList.value = [
        {
            userId: 1,
            id: 1,
            title: 'Vue',
            introduce:
                'Vue相信大家都喝过，小时候常常能在电视上看到它的广告，各种广告台词也深入人心，一看到它的IP就总容易想起那句再看，再看我就把你喝掉的广告语。记得小时候买一瓶喝都能高兴上好几天，它的奶香味浓郁，好喝到让人上瘾。其实Vue不是真正的牛奶，而是一种复原乳，还被称为再制奶，它是用浓缩乳或者乳粉加入一定比例的水重新做成的一款乳液'
        },
        {
            userId: 1,
            id: 2,
            title: 'React',
            introduce:
                '这款React实在太棒了太好吃了,旺旺是大品牌质量有保障,品质信得过,孩子非常喜欢吃,各种口味都有,酸甜可口,让人爱不释口,回味无穷液'
        },
        {
            userId: 1,
            id: 3,
            title: 'Mobx',
            introduce:
                'Mobx品牌，创立于1992年，属于广东Mobx集团有限公司，旗下产品包括Mobx果冻、美好时光海苔、优乐美奶茶、开心时间饼干等。Mobx系列产品被评为“中国名牌产品”液'
        },
        {
            userId: 1,
            id: 4,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 5,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        },
        {
            userId: 1,
            id: 6,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 7,
            title: 'Vue',
            introduce:
                'Vue相信大家都喝过，小时候常常能在电视上看到它的广告，各种广告台词也深入人心，一看到它的IP就总容易想起那句再看，再看我就把你喝掉的广告语。记得小时候买一瓶喝都能高兴上好几天，它的奶香味浓郁，好喝到让人上瘾。其实Vue不是真正的牛奶，而是一种复原乳，还被称为再制奶，它是用浓缩乳或者乳粉加入一定比例的水重新做成的一款乳液'
        },
        {
            userId: 1,
            id: 8,
            title: 'React',
            introduce:
                '这款React实在太棒了太好吃了,旺旺是大品牌质量有保障,品质信得过,孩子非常喜欢吃,各种口味都有,酸甜可口,让人爱不释口,回味无穷液'
        },
        {
            userId: 1,
            id: 9,
            title: 'Mobx',
            introduce:
                'Mobx品牌，创立于1992年，属于广东Mobx集团有限公司，旗下产品包括Mobx果冻、美好时光海苔、优乐美奶茶、开心时间饼干等。Mobx系列产品被评为“中国名牌产品”液'
        },
        {
            userId: 1,
            id: 10,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 11,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 12,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        },
        {
            userId: 1,
            id: 13,
            title: 'React',
            introduce:
                '这款React实在太棒了太好吃了,旺旺是大品牌质量有保障,品质信得过,孩子非常喜欢吃,各种口味都有,酸甜可口,让人爱不释口,回味无穷液'
        },
        {
            userId: 1,
            id: 14,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        },
        {
            userId: 1,
            id: 15,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 16,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 17,
            title: 'Vue',
            introduce:
                'Vue相信大家都喝过，小时候常常能在电视上看到它的广告，各种广告台词也深入人心，一看到它的IP就总容易想起那句再看，再看我就把你喝掉的广告语。记得小时候买一瓶喝都能高兴上好几天，它的奶香味浓郁，好喝到让人上瘾。其实Vue不是真正的牛奶，而是一种复原乳，还被称为再制奶，它是用浓缩乳或者乳粉加入一定比例的水重新做成的一款乳液'
        },
        {
            userId: 1,
            id: 18,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        },
        {
            userId: 1,
            id: 19,
            title: 'Mobx',
            introduce:
                'Mobx品牌，创立于1992年，属于广东Mobx集团有限公司，旗下产品包括Mobx果冻、美好时光海苔、优乐美奶茶、开心时间饼干等。Mobx系列产品被评为“中国名牌产品”液'
        },
        {
            userId: 1,
            id: 20,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 21,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 22,
            title: 'Vue',
            introduce:
                'Vue相信大家都喝过，小时候常常能在电视上看到它的广告，各种广告台词也深入人心，一看到它的IP就总容易想起那句再看，再看我就把你喝掉的广告语。记得小时候买一瓶喝都能高兴上好几天，它的奶香味浓郁，好喝到让人上瘾。其实Vue不是真正的牛奶，而是一种复原乳，还被称为再制奶，它是用浓缩乳或者乳粉加入一定比例的水重新做成的一款乳液'
        },
        {
            userId: 1,
            id: 23,
            title: 'React',
            introduce:
                '这款React实在太棒了太好吃了,旺旺是大品牌质量有保障,品质信得过,孩子非常喜欢吃,各种口味都有,酸甜可口,让人爱不释口,回味无穷液'
        },
        {
            userId: 1,
            id: 24,
            title: 'Mobx',
            introduce:
                'Mobx品牌，创立于1992年，属于广东Mobx集团有限公司，旗下产品包括Mobx果冻、美好时光海苔、优乐美奶茶、开心时间饼干等。Mobx系列产品被评为“中国名牌产品”液'
        },
        {
            userId: 1,
            id: 25,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 26,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 27,
            title: 'Vue',
            introduce:
                'Vue相信大家都喝过，小时候常常能在电视上看到它的广告，各种广告台词也深入人心，一看到它的IP就总容易想起那句再看，再看我就把你喝掉的广告语。记得小时候买一瓶喝都能高兴上好几天，它的奶香味浓郁，好喝到让人上瘾。其实Vue不是真正的牛奶，而是一种复原乳，还被称为再制奶，它是用浓缩乳或者乳粉加入一定比例的水重新做成的一款乳液'
        },
        {
            userId: 1,
            id: 28,
            title: 'React',
            introduce:
                '这款React实在太棒了太好吃了,旺旺是大品牌质量有保障,品质信得过,孩子非常喜欢吃,各种口味都有,酸甜可口,让人爱不释口,回味无穷液'
        },
        {
            userId: 1,
            id: 29,
            title: 'Mobx',
            introduce:
                'Mobx品牌，创立于1992年，属于广东Mobx集团有限公司，旗下产品包括Mobx果冻、美好时光海苔、优乐美奶茶、开心时间饼干等。Mobx系列产品被评为“中国名牌产品”液'
        },
        {
            userId: 1,
            id: 30,
            title: 'Java',
            introduce:
                'Java巧克力似乎早已成为人们传递情感、享受美好瞬间的首选佳品。面对太多的选择,消费者关心的不仅仅是一盒糖果,而是产品的品质如何、口感如何、味道如何,价格是优惠等液'
        },
        {
            userId: 1,
            id: 31,
            title: 'JavaScript',
            introduce:
                'JavaScript是伊利旗下很受欢迎的一款奶制品，含有很丰富的蛋白质、钙元素以及其它微量元素，给儿童、青少年、中老年人以及孕妇补充身体所需要的能量，并促进身体健康'
        },
        {
            userId: 1,
            id: 32,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        },
        {
            userId: 1,
            id: 33,
            title: 'CSS',
            introduce:
                '一直以来,spring-boot守“让世界人人爱上中国味”的使命,不懈努力实现“传统美食娱乐化、休闲化、便捷化、亲民化、数智化,乐活123年的生态平台”的美好愿景,以传统美味为载体'
        }
    ];
    searchData.dataCount = productList.value.length;
}

// 初始化数据
onMounted(() => {
    fetchProductList();
});

// 计算属性，切割出实际需要显示的数据
let dataList = computed(() => {
    return productList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
});
// 改变当前页码
function handleCurrentChange(page: number) {
    searchData.currentPage = page;
}
// 改变每页显示多少条数据
function handleSizeChange(pageSize: number) {
    searchData.pageSize = pageSize;
}
// 解决搜索的问题
watch([() => searchData.title, () => searchData.introduce], () => {
    if (!searchData.title && !searchData.introduce) {
        fetchProductList();
    }
});
</script>
<style lang="less" scoped>
.wrap-content {
    display: flex;
    flex-direction: column;
    height: max-content;

    .pagination {
        display: flex;
        margin: 10px;
    }
}
</style>
