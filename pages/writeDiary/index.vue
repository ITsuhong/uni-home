<script setup>
	import {
		getWeek
	} from "@/utils/util"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import lunisolar from 'lunisolar'
	import {
		ref
	} from "vue"
	import dayjs from 'dayjs'
	const lunar = ref('')
	const txt = ref('')
</script>

<template>
	<view class="flex justify-between bg-white px-3 py-2">
		<view>{{dayjs().format("MM月DD日")}}</view>
		<view>星期{{getWeek()}}</view>
		<view>农历：{{lunisolar().format('lMlD')}}</view>
	</view>
	<view class="p-3 bg-[#f9f9f9]">
		<textarea placeholder="日记内容" style="height: 800rpx;" :maxlength="0" class="textarea" v-model="txt"></textarea>
	</view>
	<view class="mt-12 px-3">
		<view class="w-full flex justify-center bg-[#201615] rounded-md py-3 text-white">提交保存</view>
	</view>
</template>



<style>
</style>