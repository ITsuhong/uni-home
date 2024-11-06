<script setup>
	import {
		ref
	} from 'vue'

	const images = ref([
		'https://fakeimg.pl/350x400/?text=World&font=lobster',
		'https://fakeimg.pl/350x250/?text=World&font=lobster',
		'https://fakeimg.pl/350x300/?text=World&font=lobster',
		'https://fakeimg.pl/350x450/?text=World&font=lobster',
		'https://fakeimg.pl/350x280/?text=World&font=lobster',
		'https://fakeimg.pl/350x320/?text=World&font=lobster',
		'https://fakeimg.pl/350x380/?text=World&font=lobster',
		'https://fakeimg.pl/350x420/?text=World&font=lobster',
		'https://fakeimg.pl/350x360/?text=World&font=lobster'
	])
</script>

<template>
	<view class="page-container">
		<view class="waterfall-container">
			<view class="waterfall-item" v-for="(img, index) in images" :key="index">
				<image :src="img" :alt="`图片${index + 1}`" mode="widthFix" />
			</view>
		</view>
	</view>
	<uni-fab :popMenu="false" horizontal="right"></uni-fab>
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