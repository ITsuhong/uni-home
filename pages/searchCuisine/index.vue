<script setup>
	import {
		ref
	} from "vue"
	import {
		getSearchKeywords
	} from "@/utils/util.js"
	import {
		getWord
	} from "@/api/cuisine.js"
	const autoCompleteValue = ref([])
	const searchValue = ref("")
	import useCuisineStore from "@/stores/cuisine.js"
	const cuisineStore = useCuisineStore()
	const list = ref([])
	const search = async () => {
		console.log("触发");
		if (!searchValue.value) return
		const res = await getWord({
			keyWord: searchValue.value
		})
		list.value = res.data
		autoCompleteValue.value = []
	}
	const input = (e) => {
		const result = getSearchKeywords(e, cuisineStore.allList)
		autoCompleteValue.value = result
	}
	const handleOptionKeyword = async (record) => {
		searchValue.value = record.title
		const res = await getWord({
			keyWord: record?.title
		})
		list.value = res.data
		autoCompleteValue.value = []
	}
	const handleOptionDetail = (record) => {
		uni.navigateTo({
			url: `/pages/cuisineDetail/index?id=${record.cId}`
		})
	}
	const handoptionEat = async (record) => {
		record.is_eat = record.is_eat == 1 ? 2 : 1
		await setIsEat({
			id: record?.cId,
			is_eat: record.is_eat
		})
		getCount()
	}
	const hanleOptionToUrl = () => {
		uni.navigateTo({
			url: '/pages/eatList/index'
		})
	}
</script>
<template>
	<view class="p-3 relative pt-0">
		<view class="sticky top-0 z-30 left-0 right-0 bg-white pt-1">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input">

			</uni-search-bar>
		</view>
		<view class="absolute top-14 left-0 z-30 right-0" v-if="autoCompleteValue.length">
			<scroll-view scroll-y class="px-4 pb-4 max-h-60 bg-white shadow">
				<view v-for="item in autoCompleteValue" class="my-4" @click="handleOptionKeyword(item)">{{ item.title }}
				</view>
			</scroll-view>
		</view>
		<view class="grid grid-cols-2 gap-4 mt-3">
			<template v-for="(item,index) in list" :key="item.id">
				<view class="w-full" @click="handleOptionDetail(item)">
					<view class="relative">
						<image :src="item?.cover" mode="aspectFill" class="w-full h-[300rpx] rounded-md"></image>
						<view @click.stop="handoptionEat(item)" class="absolute top-1 right-1">
							<uni-icons v-if="item.is_eat==1" type="heart" size="26" color="#f47d82"></uni-icons>
							<uni-icons v-if="item.is_eat==2" type="heart-filled" size="26" color="#f47d82"></uni-icons>
						</view>
					</view>
					<view class="flex justify-center mt-2">{{item?.title}}</view>
				</view>
			</template>

		</view>
	</view>
</template>