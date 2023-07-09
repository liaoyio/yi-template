<template>
	<div class="w-screen">
		<a-config-provider :theme="{ token: { colorPrimary: '#00b96b' } }">
			<!-- <router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view> -->
			<router-view />
		</a-config-provider>
	</div>
</template>

<script setup lang="ts">
const user = userStore()
user.getUser()
</script>
<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
