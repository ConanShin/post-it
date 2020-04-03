<template>
    <div class="main">
        <input class="search-bar" v-model="searchKeyword" @keyup="setKeyword" placeholder="키워드 검색"/>
        <tabs :tabs="tabs">
            <private-post></private-post>
            <today-post></today-post>
            <all-post></all-post>
        </tabs>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import Tabs from "vue-slide-tabs"
    import PrivatePost from './PrivatePost'
    import AllPost from './AllPost'
    import TodayPost from './TodayPost'

    @Component({
        components: {Tabs, PrivatePost, TodayPost, AllPost}
    })
    export default class Main extends Vue {
        searchKeyword = ''
        tabs = [
            {label: 'Private'},
            {label: 'Today'},
            {label: 'All'}
        ]

        beforeMount() {
            this.$store.dispatch('fetchPosts')
        }

        setKeyword() {
            console.log('search')
            this.$store.commit('setSearchKeyword', this.searchKeyword)
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .search-bar {
        width: 100%;
        height: 30px;
        font-size: 20px;
        color: darkslategray;
        padding: 10px;
    }
</style>
