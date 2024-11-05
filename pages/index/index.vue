<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {ref} from "vue"
	const topPostion=ref(0)
	import Clock from "@/components/Clock/index.vue"
	const hanleOptionToUrl=(url)=>{
		uni.navigateTo({
			url:url
		})
	}
	onLoad(()=>{
		const {top} =uni.getMenuButtonBoundingClientRect()
		topPostion.value=top
		
	})
</script>
<template>
	<image class="absolute h-screen w-screen z-0" src="@/static/images/indexBg.jpg"></image>
	<view class=" h-screen relative z-10 flex flex-col">
		<view class="w-full" :style="{height:topPostion+'px'}"></view>
		<view class="flex-1 z-10 flex flex-col justify-between" >
			<view>
				<view class="inline-flex items-end p-3 bg-[#f4f5f1] bg-opacity-40 rounded-r-[20rpx]">
					<view class="text-[24rpx] text-[#828894] font-extralight">我们在一起</view>
					<view class="text-[50rpx] font-bold mx-1 text-[#593794]">198</view>
					<view class="text-[24rpx] text-[#828894] font-extralight">天</view>
				</view>
				<Clock/>
			</view>
			<view class="mb-40  px-3 w-full flex justify-between">
				<view class="w-[49%]" @click="hanleOptionToUrl('/pages/diary/index')">
					<view class="cusbg1 w-full bg-red rounded-lg h-52 p-3 relative">
						<view class="font-bold text-[40rpx]">我们的</view>
						<view class="font-bold text-[40rpx]">日记</view>
						<view class="text-[#434343] mt-2 text-[24rpx] w-2/3">
							每天记录美好瞬间，留住温暖，增添生活色彩
						</view>
						<image class="absolute -bottom-[170rpx] -left-[80rpx] scale-[0.4]" src="@/static/images/shu.png"></image>
					</view>
				</view>
				<view class="w-[49%] flex flex-col">
					<view class="cusbg2 bg-opacity-20 flex-1 mb-2 rounded-lg p-4">
						<view class="font-bold text-[40rpx]">珍藏册</view>
						<view class="text-[#434343] mt-2 text-[24rpx]">记忆都在这里</view>
					</view>
					<view class="cusbg3  flex-1 rounded-lg p-4">
						<view class="font-bold text-[40rpx]">礼物柜</view>
						<view class="text-[#434343] mt-2 text-[24rpx]">收到的礼物记录一下</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
	.cusbg1{
	background: #42D6E1;
	background: linear-gradient(315deg, #42D6E1, #91F79F);
	}
	.cusbg2{
		
		background: #F7D0E3;
		background: linear-gradient(270deg, #F7D0E3, #F3E1D7);
	}
	.cusbg3{
		background: #FBFBFB;
		background: linear-gradient(270deg, #FBFBFB, #E3EFFB);
	}
</style>