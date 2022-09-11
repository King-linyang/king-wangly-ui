<template>
    <div class="login">
        <el-card class="box-card">
            <el-form ref="form" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item prop="user" label="账号:">
                    <el-input v-model="formInline.user" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" label="密码:">
                    <el-input v-model="formInline.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormItemRule, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
const router = useRouter()

type Form = {
    user: string,
    password: string
}
type Rules = {
    [K in keyof Form]?: Array<FormItemRule>
}
const formInline = reactive<Form>({
    user: '',
    password: '',
})

const form = ref<FormInstance>()

//校验规则
const rules = reactive<Rules>({
    user: [
        {
            required: true,
            message: "请输入账号",
            type: "string"
        }
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            type: "string"
        }
    ]
})



const onSubmit = () => {
    console.log('submit!', form.value)
    form.value?.validate((validate) => {
        console.log('submit!', validate)
        if (validate) {
            initRouter()
            // router.push('/red')
            localStorage.setItem('token', '1')

        } else {
            ElMessage.error('请输入完整信息')
        }
    })
}
const routerData: any[] = []
routerData.push([
    {
        path: "/demo1",
        name: "Demo1",
        component: 'demo1.vue'
    },
    {
        path: "/demo2",
        name: "Demo2",
        component: 'demo2.vue'
    }
]
)
//动态路由后端配置
const initRouter = () => {
    routerData.forEach((route: any) => {
        console.log('route', route)
        router.addRoute({
            path: route.path,
            name: route.name,
            //这儿不能使用@
            component: () => import(/* @vite-ignore */`../views/${route.component}`)
        })
        router.push('/red')
        console.log(router.getRoutes);

    })
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
