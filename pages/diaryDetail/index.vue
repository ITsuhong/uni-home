<script setup>
	import {
		moodList,
		weatherList
	} from "@/utils/util.js"
	import dayjs from "dayjs"
	import {
		getWeek
	} from "@/utils/util"
	import {onLoad,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
	import {ref} from "vue"
	import {getDetail} from "@/api/diary.js"
	import {createComment,getComment} from "@/api/comment.js"
	const content=ref("")
	const diary_id=ref()
	const data=ref()
	const commentList=ref([])
	const hanleOptionSave=async ()=>{
		if(!content.value){
			return uni.showToast({
				title:"请输入内容",
				icon:"none"
			})
		}
		await createComment({diary_id:diary_id.value,content:content.value})
		getCommentList();
		content.value=""
	}
	const getCommentList=async ()=>{
		const res=await getComment({diary_id:diary_id.value})
		commentList.value=res.data
		
	}
	onLoad(async (options)=>{
		const res=await getDetail({id:Number(options?.id)})
		diary_id.value=Number(options?.id)
		data.value=res.data
		getCommentList();
	})
	onShareAppMessage(()=>{
		return{
			title:"胡胖胖之家"
		}
	})
	onShareTimeline(()=>{
		return{
			title:"胡胖胖之家"
		}
	})
</script>

<template>
	<view class="p-3" >
		<view class="flex justify-center ">
			<view class="mr-2 text-[#989AA0]">{{dayjs(data?.createTime).format("YYYY-MM-DD")}}</view>
			<view class="mr-2 text-[#989AA0]">{{dayjs(data?.createTime).format("HH:mm:ss")}}</view>
			<view class="text-[#989AA0]">星期{{getWeek(data?.createTime)}}</view>
		</view>
		<view class="mt-2 flex items-center justify-center">
			<view class="flex flex-col items-center justify-center">
				<image class="h-7 w-7" :src="moodList.find(item=>item.value==data?.mood)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{moodList.find(item=>item.value==data?.mood)?.name}}</view>
			</view>
			<view class="w-[2rpx] h-4 bg-[#E8E8E8] mx-2"></view>
			<view class="flex flex-col items-center justify-center">
				<image class="w-7 h-7" :src="weatherList.find(item=>item.value==data?.weather)?.url"></image>
				<view class="text-[#999999] text-[24rpx]">{{weatherList.find(item=>item.value==data?.weather)?.name}}</view>
			</view>
		</view>
		<view class="mt-4 text-[#555555] leading-6 whitespace-pre-wrap">
			{{data?.content}}
		</view>
	
	</view>
	<view class="mt-12 px-3">
		<template v-for="item in commentList" :key="item.id">
			<view class="flex mt-3">
				<image mode="aspectFill" class="rounded-md w-10 h-10 mr-2" :src="item.user.header_url"></image>
				<view class="flex-1">
					<view class="w-full flex justify-between text-[24rpx] text-[#999999]">
						<view>{{item.user.name}}</view>
						<view>{{dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")}}</view>
					</view>
					<view class="text-sm mt-1 text-[#555555]">{{item.content}}</view>
				</view>
			</view>
		</template>
	</view>
	<view class="mt-12 bg-[#F5F7FA] py-3 fixed bottom-0 left-0 right-0">
		<view class="p-3 bg-white mx-3 mt-18 rounded-md">
			<textarea  style="height: 100rpx;" :maxlength="0" v-model="content" placeholder="留下你的留言"></textarea>
		</view>
		<view class="mt-2 px-3">
			<view @click="hanleOptionSave" class="w-full flex justify-center bg-[#201615] rounded-md py-2 text-white">提交保存</view>
		</view>
	</view>
</template>



<style>
</style>