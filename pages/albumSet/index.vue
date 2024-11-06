<script setup>
import {ref} from "vue"
const popup=ref()
const hanleOptionCreate=()=>{
	popup.value?.open()
}
const name=ref('');
const handleOptionDetail=()=>{
	uni.navigateTo({
		url:"/pages/albumDetail/index"
	})
}
</script>

<template>
	<view class="p-3">
		<view class="grid grid-cols-2 gap-4">
			<view @click="handleOptionDetail" class="w-42 bg-white rounded-lg pb-1">
				<image class="w-full h-32 rounded-t-lg" mode="aspectFill"
					src="https://fakeimg.pl/350x200/?text=World&font=lobster"></image>
				<view class="flex justify-between px-2">
					<view>电影票</view>
					<view>共 0 张</view>
				</view>
			</view>
			<view class="w-42  bg-white rounded-lg pb-1">
				<image class="w-full h-32 rounded-t-lg" mode="aspectFill"
					src="https://fakeimg.pl/350x200/?text=World&font=lobster"></image>
				<view class="flex justify-between px-2 text-sm">
					<view>电影票</view>
					<view>共 0 张</view>
				</view>
			</view>
		</view>
	</view>
	<view class="fixed flex justify-center left-0 right-0 bottom-20">
		<view @click="hanleOptionCreate" class="text-[#999999] px-12 py-2 bg-white rounded-full flex items-center">
			<uni-icons color="#999999" type="plusempty" size="26"></uni-icons>
			<view class="ml-2">创建新的相册集</view>
		</view>
	</view>
	<uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
		<view class="w-[600rpx] h-32 bg-white rounded-md p-4">
			<view class="bg-[#F5F7FA] p-3 rounded-lg">
				<input  placeholder="请输入相册名称" v-model="name"/>
			</view>
			<view class="flex justify-end mt-3">
				<view class="text-white px-5 py-2 bg-[#4096ff] rounded-lg">确定</view>
			</view>
			
		</view>
	</uni-popup>
</template>



<style>
	page {
		background-color: #F5F7FA;
	}
</style>