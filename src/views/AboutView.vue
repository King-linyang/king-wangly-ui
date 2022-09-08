<template>
  <div>
    <button @click="Add">+</button>
    <button @click="rest">--</button>
    <div>
      {{Test.current}}---{{Test.age}}
    </div>
  </div>
</template>


<script setup lang='ts'>
import { useTestStore } from '@/store/index'
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

</script>