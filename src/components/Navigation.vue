<template>
	<div class="hidden bg-black py-4 text-white shadow sm:!block">
		<div class="mx-auto px-4 container !max-w-screen-xl">
			<div class="flex_c gap-6">
				<RouterLink class="flex" to="/"> Montplex </RouterLink>
				<div class="ml-auto flex_c gap-2">
					<button class="nav_qs_btn p-0" @click="question_modal = true">
						<icon-svg-question class="svg_icon" />
					</button>
					<TsModalNavQuestion v-model="question_modal" />

					<a-popover placement="bottomRight" trigger="click">
						<template #content>
							<TsNavMessage />
						</template>
						<button class="nav_qs_btn hover:bg-[#3f3f46]">
							<icon-svg-notice class="svg_icon" />
							<a-badge :count="6" shape="square" size="small" />
						</button>
					</a-popover>

					<div class="flex_c gap-0.5">
						<TsNavTeamDropdown />
						<TsNavUserDropdown />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const question_modal = ref<boolean>(false)
</script>

<style lang="scss">
.nav_qs_btn {
	@apply items-center justify-center gap-0.5 rounded-lg bg-transparent h-10 flex px-2;
	.svg_icon {
		@apply mt-[2px] text-[22px] text-white;
	}
}
</style>
