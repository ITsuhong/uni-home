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
	import dayjs, {
		unix
	} from 'dayjs'
	import {
		moodList,
		weatherList
	} from "@/utils/util.js"
	import {
		createDiary
	} from "@/api/diary.js"
	const lunar = ref('')
	const popupmood = ref();
	const popupweather = ref();
	const content = ref('')
	const selectMood = ref('')
	const selectWeather = ref('')
	const hanleOptionClick = (action) => {
		switch (action) {
			case 'mood':
				popupmood.value?.open()
				break;
			case 'weather':
				popupweather.value?.open()
				break;
			default:
				break;
		}
	}
	const hanleOptionSelectMood = (record) => {
		selectMood.value = record
		popupmood.value?.close()
	}
	const hanleOptionSelectWeather = (record) => {
		selectWeather.value = record
		popupweather.value?.close()
	}
	const hanleOptionSave = async () => {
		if (!content.value) {
			return uni.showToast({
				title: "请输入内容",
				icon: "none"
			})
		}
		if (!selectMood.value) {
			uni.showToast({
				title: "选择心情",
				icon: "none"
			})
			return popupmood.value?.open()
		}
		if (!selectWeather.value) {
			uni.showToast({
				title: "选择天气",
				icon: "none"
			})
			return popupweather.value?.open()
		}
		const res=await createDiary({
			content: content.value,
			mood: selectMood.value,
			weather: selectWeather.value
		});
		if(res.code==200){
			uni.showToast({
				title:"操作成功"
			})
			setTimeout(()=>{
				uni.navigateBack()
			},1500)
		}
		console.log(res);
	}
</script>

<template>
	<view class="flex justify-between bg-white px-3 py-2">
		<view>
			<view class="flex items-center">
				<view>{{ dayjs().format("YYYY/MM/DD") }}</view>
				<view class="text-sm text-[#999999] ml-3">星期{{ getWeek() }}</view>
			</view>
			<view class="text-[24rpx] text-[#999999]">农历:{{ lunisolar().format('lMlD') }}</view>
		</view>
		<view class="flex items-center">
			<view class="mr-2">
				<image v-if="selectMood" @click="hanleOptionClick('mood')" class="w-8 h-7"
					:src="moodList.find(item => item.value == selectMood).url"></image>

				<image v-else @click="hanleOptionClick('mood')" class="w-8 h-7" src="@/static/images/moodSelection.png">
				</image>
			</view>
			<view>
				<image @click="hanleOptionClick('weather')" v-if="selectWeather" class="w-8 h-7"
					:src="weatherList.find(item => item.value == selectWeather).url"></image>

				<image v-else @click="hanleOptionClick('weather')" src="@/static/images/weather.png" class="w-7 h-6">
				</image>
			</view>
		</view>
	</view>
	<view class="p-3 bg-[#f9f9f9]">
		<textarea placeholder="日记内容" style="height: 800rpx;" :maxlength="0" class="textarea"
			v-model="content"></textarea>
	</view>
	<view class="mt-12 px-3">
		<view @click="hanleOptionSave" class="w-full flex justify-center bg-[#201615] rounded-md py-3 text-white">提交保存
		</view>
	</view>
	<uni-popup ref="popupmood" type="center" border-radius="10px 10px 0 0">
		<view class="bg-white rounded-md px-3 py-5">
			<view class="flex justify-center pb-2 mb-3 border-b-[2rpx] border-[#E8E8E8] ">
				现在心情怎么样
			</view>
			<!-- <image class="w-8 h-7" :src="wuliao"></image> -->
			<view class="grid grid-cols-3 gap-8 ">
				<template v-for="item in moodList" :key="item.name">
					<view @click="hanleOptionSelectMood(item.value)" :class="{
						'flex flex-col items-center border-[1rpx] px-3 py-1 rounded-md': true,
						'border-[#999999]': selectMood == item.value,
						'border-transparent': selectMood !== item.value
					}">
						<image class="w-16 h-16" :src="item.url"></image>
						<view class="text-sm text-[#999999] mt-1">{{ item.name }}</view>
					</view>
				</template>
			</view>

		</view>
	</uni-popup>
	<uni-popup ref="popupweather" type="center" border-radius="10px 10px 0 0">
		<view class="bg-white rounded-md px-3 py-5">
			<view class="flex justify-center pb-2 mb-3 border-b-[2rpx] border-[#E8E8E8] ">
				今天天气怎么样
			</view>
			<!-- <image class="w-8 h-7" :src="wuliao"></image> -->
			<view class="grid grid-cols-3 gap-8 ">
				<template v-for="item in weatherList" :key="item.name">
					<view @click="hanleOptionSelectWeather(item.value)" :class="{
						'flex flex-col items-center border-[1rpx] px-3 py-1 rounded-md': true,
						'border-[#999999]': selectWeather == item.value,
						'border-transparent': selectWeather !== item.value
					}">
						<image class="w-16 h-16" :src="item.url"></image>
						<view class="text-sm text-[#999999] mt-1">{{ item.name }}</view>
					</view>
				</template>
			</view>

		</view>
	</uni-popup>
</template>