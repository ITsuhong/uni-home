import dayjs from "dayjs"
import kaixin from "@/static/images/mood/kaixin.png"
import xiaokaixin from "@/static/images/mood/xiaokaixin.png"
import pingjingshushi from "@/static/images/mood/pingjingshushi.png"
import xiaonanguo from "@/static/images/mood/xiaonanguo.png"
import tongkuliuti from "@/static/images/mood/tongkuliuti.png"
import youdianjiaolu from "@/static/images/mood/youdianjiaolu.png"
import shengqi from "@/static/images/mood/shengqi.png"
import pipei from "@/static/images/mood/pipei.png"
import wuliao from "@/static/images/mood/wuliao.png"

import qingtian from "@/static/images/weather/qingtian.png"
import yintian from "@/static/images/weather/yintian.png"
import duoyun from "@/static/images/weather/duoyun.png"
import xiayu from "@/static/images/weather/xiayu.png"
import xiaxue from "@/static/images/weather/xiaxue.png"

export const getWeek = (date) => {
	
	const weeks = {
		1: "一",
		2: "二",
		3: "三",
		4: "四",
		5: "五",
		6: "六",
		7: "七"
	}
	
	return weeks[dayjs(date).format('d')]
}

export const moodList = [{
		value: 1,
		name: "超开心",
		url: kaixin
	},
	{
		value: 2,
		name: "小开心",
		url: xiaokaixin
	},
	{
		value: 3,
		name: "平静舒适",
		url: pingjingshushi
	},
	{
		value: 4,
		name: "小难过",
		url: xiaonanguo
	},
	{
		value: 5,
		name: "痛哭流涕",
		url: tongkuliuti
	},
	{
		value: 6,
		name: "有点焦虑",
		url: youdianjiaolu
	},
	{
		value: 7,
		name: "很生气",
		url: shengqi
	},
	{
		value: 8,
		name: "有点疲惫",
		url: pipei
	},
	{
		value: 9,
		name: "有点无聊",
		url: wuliao
	}
]

export const weatherList = [{
		value: 1,
		name: "晴天",
		url: qingtian
	},
	{
		value: 2,
		name: "阴天",
		url: yintian
	},

	{
		value: 3,
		name: "多云",
		url: duoyun
	},
	{
		value: 4,
		name: "下雨",
		url: xiayu
	},
	{
		value: 5,
		name: "下雪",
		url: xiaxue
	}
]