<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from "@dcloudio/uni-app"
	import useCuisineStore from "@/stores/cuisine.js"
	import useUserStore from "@/stores/user.js"
	const userStore = useUserStore()
	const cuisineStore = useCuisineStore()
	onLaunch(async () => {
		console.log(userStore);
		await userStore.login()
		cuisineStore.getAll()

		// userStore.login()
	})
</script>

<style lang="scss">
	@import 'tailwindcss/base';
	@import 'tailwindcss/utilities';
	/* start--文本行数限制--start */
	.u-line-1 {
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	
	.u-line-2 {
	  -webkit-line-clamp: 2;
	}
	
	.u-line-3 {
	  -webkit-line-clamp: 3;
	}
	
	.u-line-4 {
	  -webkit-line-clamp: 4;
	}
	
	.u-line-5 {
	  -webkit-line-clamp: 5;
	}
	.u-line-8{
	  -webkit-line-clamp: 8;
	}
	.u-line-2,
	.u-line-3,
	.u-line-4,
	.u-line-5,
	.u-line-6,
	.u-line-7,
	.u-line-8{
	  overflow: hidden;
	  word-break: break-all;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	}
</style>