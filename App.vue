<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from "@dcloudio/uni-app"
	import useUserStore from "@/stores/user.js"
	const userStore = useUserStore()
	onLaunch(async () => {
		console.log(userStore);
		await userStore.login()
		// userStore.login()
	})
</script>

<style lang="scss">
	@import 'tailwindcss/base';
	@import 'tailwindcss/utilities';
</style>