<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue"
	import {
		getMovies
	} from "@/api/movie.js"
	const list = ref([])
	const hanleOption=(record)=>{
		uni.navigateTo({
			url:`/pages/movieDetail/index?id=${record?.id}`
		})
	}
	onLoad(async () => {
		const res = await getMovies()
		list.value = res.data
		console.log(res.data);
	})
</script>
<template>
	<view class="p-3">
		<view class="grid grid-cols-2 gap-3">
			<template v-for="item in list" :key="item.id">
				<view class="w-full" @click="hanleOption(item)">
					<image mode="aspectFill" class="rounded-lg w-full h-[400rpx]"
						:src="item?.imgUrl"></image>
					<view class="flex justify-center text-white mt-2">{{item.title}}</view>
					<view class="text-[24rpx] u-line-1 text-white mt-2">{{item.info}}</view>
				</view>
			</template>


		</view>
	</view>
</template>
<style>
	page {
		background-color: #272926;
	}
</style>