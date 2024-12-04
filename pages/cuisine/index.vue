<script setup>
	import {
		ref
	} from "vue"
	import {
		onLoad,
		onShow,
		onReachBottom
	} from "@dcloudio/uni-app"
	import useCuisineStore from "@/stores/cuisine.js"
	import {
		getEatList
	} from "@/api/cuisine.js"
	import {
		storeToRefs
	} from "pinia"
	import {
		setIsEat
	} from "@/api/cuisine.js"
	import LoadMore from "@/components/LoadMore/index.vue"
	const cuisineStore = useCuisineStore()
	const {
		pagination,
		loading,
		list
	} = storeToRefs(cuisineStore)
	const tabs = [
		"热菜",
		"凉菜",
		"汤羹",
		"主食",
		"小吃",
		"西餐",
		"烘焙",
		"饮品",
	]
	const selectType = ref("热菜")
	const count = ref(0)
	const getList = (pageNumber = 1, pageSize = 10) => {
		cuisineStore.query({
			pageNumber,
			pageSize,
			type: selectType.value
		})
	}
	
	const getCount=async ()=>{
		const res=await getEatList()
		count.value=res.data.length
	}
	const handleOptionSelect = (record) => {
		selectType.value = record
		getList()
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 100,
		});

	}
	const handleOptionDetail = (record) => {
		console.log(record);
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
	const hanleOptionToUrl=()=>{
		uni.navigateTo({
			url:'/pages/eatList/index'
		})
	}
	onLoad(() => {
		getList()
		getCount()

	})
	onReachBottom(() => {
		if (pagination.value.current * pagination.value.pageSize < pagination.value.total) {
			getList(pagination.value.current + 1, 10);
		}
	})
</script>
<template>
	<view class="grid grid-cols-8 gap-1 p-3 sticky top-0 bg-white z-[999]">
		<template v-for="item in tabs" :key="item">
			<view @click="handleOptionSelect(item)" :class="{
				'flex justify-center rounded-md text-sm ':true,
				'text-red':selectType==item
			}">{{item}}</view>
		</template>
	</view>
	<view class="p-3 relative">
		<view class="fixed top-1/2 z-[9999] -right-0 ">
			<view
				class="absolute top-1 right-2 flex items-center justify-center text-white text-sm w-[45rpx] h-[45rpx] bg-red rounded-full">
				{{count}}</view>
			<image @click="hanleOptionToUrl()" class="w-[150rpx] h-[150rpx]"
				src="@/static/images/eat.png"></image>

		</view>
		<view class="grid grid-cols-2 gap-4">
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
		<LoadMore :loading="loading" :pagination="pagination" />
	</view>
</template>