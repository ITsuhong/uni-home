<script setup>
	import {
		moodList,
		weatherList
	} from "@/utils/util.js"
	import dayjs from "dayjs"
	import {
		getWeek
	} from "@/utils/util"
	const props=defineProps(['data'])
	const hanleOptionDetail = () => {
		uni.navigateTo({
			url: `/pages/diaryDetail/index?id=${props.data.id}`
		})
	}
</script>

<template>
	<view class="bg-white rounded-md p-3 mb-3" @click="hanleOptionDetail">
		<view class="flex justify-center ">
			<view class="mr-2 text-[#989AA0]">{{dayjs(data?.createTime).format("YYYY-MM-DD")}}</view>
			<view class="mr-2 text-[#989AA0]">{{dayjs(data?.createTime).format("HH:mm:ss")}}</view>
			<view class="text-[#989AA0]">星期{{getWeek(data?.createTime)}}</view>
		</view>
		<view class="mt-2 flex items-center justify-center">
			<view class="flex flex-col items-center justify-center">
				<image class="h-7 w-7" :src="moodList.find(item=>item.value==data?.mood)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{moodList.find(item=>item.value==data?.mood)?.name}}</view>
			</view>
			<view class="w-[2rpx] h-4 bg-[#E8E8E8] mx-2"></view>
			<view class="flex flex-col items-center justify-center">
				<image class="w-7 h-7" :src="weatherList.find(item=>item.value==data?.weather)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{weatherList.find(item=>item.value==data?.weather)?.name}}</view>
			</view>
		</view>
		<view class="mt-4 text-[#555555] leading-6">
			{{data?.content}}
		</view>

	</view>
</template>