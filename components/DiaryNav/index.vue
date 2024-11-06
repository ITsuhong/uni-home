<script setup>
	import {
		moodList,
		weatherList
	} from "@/utils/util.js"
	const hanleOptionDetail = () => {
		console.log(122);
		uni.navigateTo({
			url: "/pages/diaryDetail/index"
		})
	}
</script>

<template>
	<view class="bg-white rounded-md p-3 mb-3" @click="hanleOptionDetail">
		<view class="flex justify-center ">
			<view class="mr-2 text-[#989AA0]">2024-11-4</view>
			<view class="mr-2 text-[#989AA0]">16:30</view>
			<view class="text-[#989AA0]">星期一</view>
		</view>
		<view class="mt-2 flex items-center justify-center">
			<view class="flex flex-col items-center justify-center">
				<image class="h-7 w-7" :src="moodList.find(item=>item.value==1)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{moodList.find(item=>item.value==1)?.name}}</view>
			</view>
			<view class="w-[2rpx] h-4 bg-[#E8E8E8] mx-2"></view>
			<view class="flex flex-col items-center justify-center">
				<image class="w-7 h-7" :src="weatherList.find(item=>item.value==1)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{weatherList.find(item=>item.value==1)?.name}}</view>
			</view>
		</view>
		<view class="mt-4 text-[#555555] leading-6">
			我们都知道在网页中设置body,html{height:100%};将body和html设置为100%，这样我们就可以在他们的子元素中使用height:100%来使的我们的容器元素占满屏幕的高度啦。但是小程序没有dom对象怎么办？
		</view>

	</view>
</template>