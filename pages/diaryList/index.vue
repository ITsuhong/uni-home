<script setup>
	import DiaryNav from "@/components/DiaryNav/index.vue"
	import useDiaryStore from "@/stores/diary.js"
	import {
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		storeToRefs
	} from "pinia"
	import LoadMore from "@/components/LoadMore/index.vue"
	import {
		ref
	} from "vue"
	const diaryStore = useDiaryStore()
	const user_id = ref()
	const {
		pagination,
		loading,
		list
	} = storeToRefs(diaryStore)
	const getList = (pageNum = 1, pageSize = 10) => {
		diaryStore.query({
			pageNum,
			pageSize,
			user_id: user_id.value
		})
	}
	onLoad((options) => {
		user_id.value = Number(options?.id)
		getList()
	})
	onReachBottom(() => {
		
		if (pagination.value.pageNum * pagination.value.pageSize < pagination.value.total) {
			
			getList(pagination.value.pageNum + 1, 10);
		}
	})
</script>

<template>
	<view class="p-3">
		<template v-for="item in list" :key="item.id">
			<DiaryNav :data="item" />
		</template>

		<LoadMore :loading="loading" :pagination="pagination" />
	</view>
</template>



<style>
	page {
		background-color: #F5F7FA;
	}
</style>