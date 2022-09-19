import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { defineStore } from 'pinia'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const settings = localStorage.getItem('layout-setting')
const storageSetting = JSON.parse(settings ? settings : '') || ''

const useSettingsStore = defineStore(
    'settings',
    {
        state: () => ({
            title: '',
            theme: storageSetting.theme || '#409EFF',
            sideTheme: storageSetting.sideTheme || sideTheme,
            showSettings: showSettings,
            topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
            tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
            fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
            sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
            dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
        }),
        //可以操作异步 和 同步提交state
        actions: {
            // 修改布局设置
            // changeSetting(data: { key: any; value: any }) {
            //     const { key, value } = data
            //     //判断属性是否包含
            //     if (this.hasOwnProperty(key)) {
            //         this.key = value
            //     }
            // },
            // 设置网页标题
            setTitle(title: string) {
                this.title = title
                useDynamicTitle();
            },
            setTheme(theme: any) {
                this.theme = theme
            },
            setSideTheme(sideTheme: any) {
                this.sideTheme = sideTheme
            },
            setShowSettings(showSettings: any) {
                this.showSettings = showSettings
            },
            setTopNav(topNav: any) {
                this.topNav = topNav
            },
            setTagsView(tagsView: any) {
                this.tagsView = tagsView
            },
            setFixedHeader(fixedHeader: any) {
                this.fixedHeader = fixedHeader
            },
            setSidebarLogo(sidebarLogo: any) {
                this.sidebarLogo = sidebarLogo
            },
            setDynamicTitle(dynamicTitle: any) {
                this.dynamicTitle = dynamicTitle
            }
        }
    })

export default useSettingsStore
