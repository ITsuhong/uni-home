<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {ref} from "vue"
	const topPostion=ref(0)
	import Clock from "@/components/Clock/index.vue"
	onLoad(()=>{
		const {top} =uni.getMenuButtonBoundingClientRect()
		topPostion.value=top
	})
</script>
<template>
	<view>
		<image :style="{marginTop:topPostion+'px'}" class="w-[200rpx] h-[50rpx]" src="@/static/images/logo.png"></image>
		<view class="flex justify-center mt-4 mb-4">
			11月01日 周五
		</view>
		<Clock/>
	</view>
</template>