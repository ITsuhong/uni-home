<script setup>
	import {
		ref
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getEatList,
		setIsEat
	} from "@/api/cuisine.js"
	const list = ref([])
	onLoad(async () => {
		const res = await getEatList()
		list.value = res.data
	})
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
	}
</script>
<template>
	<view class="p-3">
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
	</view>
</template>