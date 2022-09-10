<script setup lang="ts">
import { ref } from 'vue'
import { useTestStore } from '../store/index'

const testData = import.meta.env.VITE_APP_TITLE


const Test = useTestStore()
const Add = () => {
  // Test.current++

  // Test.$patch({
  //   current: 200,
  //   age: 40
  // })

  // Test.$patch((state) => {
  //   state.current++;
  //   state.age = 40
  // })

  // Test.$state = {
  //   current: 10,
  //   age: 30
  // }

  Test.setCurrent()

  Test.getLoginInfo()


}

const rest = () => {
  //重置
  Test.$reset()
}

//只要有state 的变化就会走这个函数  如果你的组件卸载之后还想继续调用请设置第二个参数
Test.$subscribe((args, state) => {
  console.log(args, state);

}, {
  detached: true
})

// 只要有actions被调用就会走这个函数
Test.$onAction((args) => {
  args.after(() => {
    console.log('after')
  })
  console.log('args', args);

})



defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{testData}}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <button @click="Add">加一</button>
  <button @click="rest">重置</button>
  <div>
    {{Test.current}}---{{Test.age}}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
