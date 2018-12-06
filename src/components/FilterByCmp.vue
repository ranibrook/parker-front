<template>
    <section class="filter">
        <div class="filter-by" @click="toggleFilter">
            <i class="fas fa-filter"></i>Filter
            <p class="clear-filter-btn" @click.stop="clearFilter">clear</p>
        </div>
        <div class="filter-container" v-if="isOpen">
            <div class="filter-options flex column">   
                    <p>Distance in km:</p>         
                    <el-slider v-model="filterBy.distance" show-input> </el-slider>            
                    <el-checkbox v-model="filterBy.isPaved">paved</el-checkbox>
                    <el-checkbox v-model="filterBy.isForDisable">for disabled</el-checkbox>
                    <el-checkbox v-model="filterBy.isCovered">covered</el-checkbox>
                    <el-checkbox v-model="filterBy.isAvailable">available</el-checkbox>
                    <el-button type="success" @click="filter">Done</el-button>
            </div>            
        </div>
    </section>
</template>

<script>
export default {
    data () {
        return {
            filterBy: {
                isPaved: false,
                isForDisable: false,
                isCovered: false,
                distance: 100,
                isAvailable: false
            },
            isOpen: false
        }            
    },
    methods: {
        filter() {
            console.log('filtering...')
            this.$store.commit({type:'updateFilter', filterBy: this.filterBy})
            console.log('filter updated!')
            this.isOpen = false;
        },
        toggleFilter() {
            this.isOpen = !this.isOpen
        },
        clearFilter() {
            this.filterBy.isPaved = false;
            this.filterBy.isForDisable= false,
            this.filterBy.isCovered= false,
            this.filterBy.distance= 100,
            this.filterBy.isAvailable= false
        }
    }
    
}
</script>

<style scoped>

.filter-option {
    width: 100%
}

.filter-container {
    text-align: left;
    padding: 20px;
}
.el-checkbox {
    padding-bottom: 10px;
}

.filter-by {  
    padding: 10px;
    margin: 0 20px;    
}
.filter-by:hover {
    cursor: pointer;
}

.clear-filter-btn {
    float: right;
   
}

.el-checkbox+.el-checkbox {
    margin-left: 0;  
}

</style>
