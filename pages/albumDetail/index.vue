<script setup>
	import {
		ref
	} from 'vue'
	import {
		getSuffix,
		randomString
	} from "@/utils/util.js"
	import {
		createPhotos,
		findPhotos
	} from "@/api/album.js"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	const PROD_HOST = 'http://123.56.104.248:3000';
	// const DEV_HOST = 'http://localhost:4000';
	const HOST = 'http://123.56.104.248:4000';
	const paths = ref("")
	const album_id = ref()
	const images = ref([])
	const getList = async () => {
		const res = await findPhotos({
			album_id: album_id.value
		})
		images.value = res.data.map(item => {
			return HOST + item.url
		})
	}
	const hanleOptionChoice = () => {
		console.log("点击");
		uni.chooseImage({
			success: function(res) {
				upload(res.tempFilePaths)
			}
		})
	}
	const upload = (files) => {
		uni.showLoading({
			title: '上传中...',
			mask: true
		});
		const promiseArr = files.map(item => {
			return new Promise((resolve, reject) => {
				const fileName = `${randomString(10)}${getSuffix(item)}`;
				uni.uploadFile({
					url: HOST +
						'/upload', //仅为示例，非真实的接口地址
					filePath: item,
					name: 'file',
					formData: {
						key: fileName
					},
					success: (uploadFileRes) => {
						const url = '/static/' + fileName
						return resolve(url)
					}
				});
			})
		})
		Promise.all(promiseArr.filter(r => r)).then(async (res) => {

			console.log(res, "数据");
			paths.value = res.join(",")
			await createPhotos({
				album_id: album_id.value,
				paths: paths.value
			})
			uni.hideLoading();
			
		}).finally(()=>{
			getList();
		})
		
	}
	const hanleOptionPre = (i) => {
		uni.previewImage({
			urls: images.value,
			current: i
		})
	}
	onLoad((options) => {
		album_id.value = Number(options?.id)
		getList()
	})
</script>

<template>
	<view class="page-container">
		<view class="waterfall-container">
			<view class="waterfall-item" v-for="(img, index) in images" :key="index">
				<image @click="hanleOptionPre(index)" :src="img" :alt="`图片${index + 1}`" mode="widthFix" />
			</view>
		</view>
	</view>
	<uni-fab @fabClick="hanleOptionChoice" :popMenu="false" horizontal="right"></uni-fab>
</template>

<style scoped>
	.page-container {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
	}

	.waterfall-container {
		column-count: 2;
		column-gap: 10px;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
	}

	.waterfall-item {
		break-inside: avoid;
		margin-bottom: 10px;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
	}

	.waterfall-item image {
		width: 100%;
		height: auto;
		display: block;
	}
</style>