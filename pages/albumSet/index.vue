<script setup>
	import {
		ref,
		computed
	} from "vue"
	import {
		createAlbum,
		findAlbum
	} from "@/api/album.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	const PROD_HOST = 'http://123.56.104.248:3000';
	const DEV_HOST = 'http://localhost:3000';
	const popup = ref()
	const hanleOptionCreate = () => {
		popup.value?.open()
	}
	const name = ref('');
	const list = ref([])
	const handleOptionDetail = (record) => {
		uni.navigateTo({
			url: `/pages/albumDetail/index?id=${record.id}`
		})
	}
	const getList = async () => {
		const result = await findAlbum();
		list.value = result.data
	}
	const hanleOptionSave = async () => {
		if (!name.value) {
			return uni.showToast({
				title: "请输入名字",
				icon: "none"
			})
		}
		await createAlbum({
			name: name.value
		})
		popup.value?.close()
		uni.showToast({
			title: "创建成功",
			icon: "none"
		})
		getList()
	}
	const url = computed(() => {
		return process.env.NODE_ENV === 'production' ? PROD_HOST : DEV_HOST
	})
	onLoad(() => {
		getList()
	})
</script>

<template>
	<view class="p-3">
		<view class="grid grid-cols-2 gap-4">
			<template v-for="item in list" :key="item.id">
				<view @click="handleOptionDetail(item)" class="w-42 bg-white rounded-lg pb-1">
					<image class="w-full h-32 rounded-t-lg" mode="aspectFill"
						:src="item.photos.length?url+ item.photos[0].url:'https://cdn.xuequbaike.com/upload/school-default.png'">
					</image>
					<view class="flex justify-between px-2">
						<view>{{item.name}}</view>
						<view>共 {{item.photos?.length}} 张</view>
					</view>
				</view>
			</template>

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
				<input placeholder="请输入相册名称" v-model="name" />
			</view>
			<view class="flex justify-end mt-3">
				<view @click="hanleOptionSave" class="text-white px-5 py-2 bg-[#4096ff] rounded-lg">确定</view>
			</view>

		</view>
	</uni-popup>
</template>



<style>
	page {
		background-color: #F5F7FA;
	}
</style>