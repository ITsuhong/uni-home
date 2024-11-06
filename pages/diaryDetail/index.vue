<script setup>
	import {
		moodList,
		weatherList
	} from "@/utils/util.js"
	import {ref} from "vue"
	const content=ref("")
	
</script>

<template>
	<view class="p-3" >
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
	<view class="mt-12 px-3">
		<view class="flex mt-3">
			<image class="rounded-sm w-8 h-9 mr-2" src="https://fakeimg.pl/350x200/?text=Hello"></image>
			<view class="flex-1">
				<view class="w-full flex justify-between text-[24rpx] text-[#999999]">
					<view>这是名字</view>
					<view>2024-11-06 16:42</view>
				</view>
				<view class="text-sm mt-1 text-[#555555]">这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容</view>
			</view>
		</view>
		<view class="flex mt-3">
			<image class="rounded-sm w-8 h-9 mr-2" src="https://fakeimg.pl/350x200/?text=Hello"></image>
			<view class="flex-1">
				<view class="w-full flex justify-between text-[24rpx] text-[#999999]">
					<view>这是名字</view>
					<view>2024-11-06 16:42</view>
				</view>
				<view class="text-sm mt-1 text-[#555555]">这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容</view>
			</view>
		</view>
	</view>
	<view class="mt-12 bg-[#F5F7FA] py-3 fixed bottom-0 left-0 right-0">
		<view class="p-3 bg-white mx-3 mt-18 rounded-md">
			<textarea  style="height: 100rpx;" :maxlength="0" v-model="content" placeholder="留下你的留言"></textarea>
		</view>
		<view class="mt-2 px-3">
			<view class="w-full flex justify-center bg-[#201615] rounded-md py-2 text-white">提交保存</view>
		</view>
	</view>
</template>



<style>
</style>