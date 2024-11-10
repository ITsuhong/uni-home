<script setup>
	const handleOptionClick=()=>{
		console.log('1323');
		uni.navigateTo({
			url:"/pages/writeDiary/index"
		})
	}
	const haneleOptionList=(type)=>{
		uni.navigateTo({
			url:`/pages/diaryList/index?id=${type}`
		})
	}
</script>


<template>
	<image class="absolute h-screen w-screen z-0" src="@/static/images/diary_bg.jpg"></image>
	<view class="relative z-10">
		<view class="w-full h-28"></view>
		<image @click="haneleOptionList('2')" src="@/static/images/girls.png" class="-translate-x-6"></image>
		<image @click="haneleOptionList('1')" src="@/static/images/boys.png" class="translate-x-14 mt-3"></image>
		<view class="flex justify-center mt-8" @click="handleOptionClick">
			<view class="btn-donate" >写日记</view>
		</view>
	</view>
</template>
<style>
	page{
		background-color: #f4edea;
	}
</style>

<style scoped>
	
	/* From Uiverse.io by Allyhere */ 
	.btn-donate {
	  --clr-font-main: hsla(0 0% 20% / 100);
	  --btn-bg-1: #825b4f;
	  --btn-bg-2: #dfd3c7;
	  --btn-bg-color: hsla(360 100% 100% / 1);
	  --radii: 0.5em;
	  display: flex;
	  justify-content: center;
	  cursor: pointer;
	  padding: 0.9em 1.4em;
	  min-width: 120px;
	  min-height: 44px;
	  font-size: var(--size, 1rem);
	  font-weight: 500;
	  transition: 0.8s;
	  background-size: 280% auto;
	  background-image: linear-gradient(
	    325deg,
	    var(--btn-bg-2) 0%,
	    var(--btn-bg-1) 55%,
	    var(--btn-bg-2) 90%
	  );
	  border: none;
	  border-radius: var(--radii);
	  color: var(--btn-bg-color);
	  box-shadow:
	    0px 0px 20px #dfd3c7,
	    0px 5px 5px -1px #dfd3c7,
	    inset 4px 4px 8px #dfd3c7,
	    inset -4px -4px 8px #dfd3c7;
	}
	
	.btn-donate:hover {
	  background-position: right top;
	}
	
	.btn-donate:is(:focus, :focus-visible, :active) {
	  outline: none;
	  box-shadow:
	    0 0 0 3px var(--btn-bg-color),
	    0 0 0 6px var(--btn-bg-2);
	}
	
	@media (prefers-reduced-motion: reduce) {
	  .btn-donate {
	    transition: linear;
	  }
	}


</style>