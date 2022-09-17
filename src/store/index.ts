import { defineStore } from 'pinia'
import { Names } from './store-name'

type Result = {
  name: string
  isChu: boolean
}

const Login = (): Promise<Result> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '王',
        isChu: true
      })
    }, 3000)
  })
}

export const useTestStore = defineStore(Names.Test, {
  state: () => {
    return {
      current: 1,
      age: 30,
      user: <Result>{},
      name: "123"
    }
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {

  },
  //可以操作异步 和 同步提交state
  actions: {
    setCurrent() {
      this.current++
    },
    async getLoginInfo() {
      const result = await Login()
      this.user = result;
    }
  }
})