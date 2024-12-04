<script setup>
	import {
		getCuisineDetail
	} from "@/api/cuisine.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue"
	const data = ref()
	const steps = ref()
	onLoad(async (options) => {
		const id = options?.id
		const res = await getCuisineDetail({
			id: id
		})
		if (!res.data) {
			uni.showToast({
				title: "没有数据"
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1000)
			return
		}
		data.value = res.data
		steps.value = JSON.parse(res.data.steps.replace(/"/g, '').replace(/'/g, '"').replace(/\\'/g, "'"))
		console.log(steps.value);
	})
</script>
<template>
	<view>
		<image class="w-full" mode="aspectFill" :src="data?.cover_img"></image>
		<view class="p-3">
			<view class="text-[#f36d68] mb-3 text-lg font-semibold">{{data?.title}}的做法步骤</view>
			<template v-for="(item,index) in steps" :key="index">
				<view class="mb-3 flex">
					<image class="w-[450rpx] rounded-md" mode="aspectFill" :src="item?.cover"></image>
					<view class="flex-1 ml-2 pt-3 text-[#999999] font-bold">{{index+1}}、{{item?.practice}}</view>
				</view>
			</template>
		</view>
	</view>
</template>