<script setup>
	import {
		getMovieDetail
	} from "@/api/movie.js"
	import {
		ref,
		computed
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	const data = ref()
	const isLoading=ref(true)
	const labels = ref([])
	const data_list = ref([])
	const select_label = ref('')
	const select_col = ref()
	const col_list = computed(() => {
		console.log(data_list.value?.find(item => item.label == select_label.value)?.list);
		const list = data_list.value?.find(item => item.label == select_label.value)?.list?.sort((a, b) => {
			return a.sort - b.sort
		}) || []
		if (list.length > 0 && !select_col.value?.cId) {
			select_col.value = list[0]
		}
		return list;
	})
	const loadeddata=()=>{
		isLoading.value=false
		console.log("开始加载");
	}
	const hanleOptionCol=(record)=>{
		isLoading.value=true
		select_col.value=record
	}
	onLoad(async (option) => {
		const res = await getMovieDetail({
			id: Number(option?.id)
		})
		data.value = res.data
		labels.value = Array.from(new Set(res.data.collection.map(item => item.label)))
		select_label.value = labels.value[0]
		labels.value.forEach(item => {
			const tem = {
				label: item,
				list: data.value.collection.map(c => {
					if (c.label == item) {
						return c
					}
				}).filter(i => i)
			}
			data_list.value.push(tem)

		})
		console.log(data_list.value);
	})
</script>
<template>
	<view class="p-3">
		<view v-if="select_col?.fileUrl" class="w-full relative">
			<video :autoplay="true" :play-strategy="1" @loadedmetadata=loadeddata :src="select_col.fileUrl" style="width: 100%;"></video>
			<view v-if="isLoading" class="absolute left-0 right-0 top-0 bottom-0 bg-black bg-opacity-25 text-white flex justify-center items-center">
				加载中...
			</view>
		</view>
		<view class="flex">
			<!-- <image mode="aspectFill" class="h-[400rpx] w-[300rpx] rounded-md" :src="data?.imgUrl"></image> -->
			<view class="p-2 flex-1">
				<view class="text-white">{{data?.title}}</view>
				<view class="text-white text-[26rpx] mt-2 u-line-8">{{data?.info}}</view>
			</view>
		</view>

		<view class="flex mt-6">
			<template v-for="item in labels" :key="item">
				<view @click="select_label=item" :class="{
					'text-white font-extrabold mr-4 pb-1':true,
					'text-[#d22f28] border-b-[#d22f28] border-b-2':select_label==item
				}">{{item}}</view>
			</template>
		</view>

		<view class="grid grid-cols-3 gap-2 mt-4">
			<template v-for="item in col_list" :item="item?.id">
				<view @click="hanleOptionCol(item)" :class="{
					'border-[2rpx] border-[#3e3f42] max-w-full u-line-1 rounded-md text-white flex justify-center py-2':true,
					'text-[#d22f28] border-[#d22f28]':select_col.cId==item.cId
				}">
					{{item?.text}}
				</view>
			</template>

		</view>

	</view>
</template>
<style>
	page {
		background-color: #111318;
	}
</style>