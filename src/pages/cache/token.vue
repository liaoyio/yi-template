<template>
	<div class="py-6">
		<div class="top_add">
			<AButton type="primary" @click="hcCreate">Add Access Token</AButton>
		</div>
		<div v-if="list && list.length">
			<TsTokenItem
				v-for="item in list"
				:key="item.id"
				:item="item"
				@delete-click="deleteClick"
				@edit-click="editClick"
			/>
		</div>

		<TsEmptyNotToken v-else @btnClick="hcCreate" />
		<TsModalAddToken ref="addRef" @addOk="hcAddOk" />
		<TsModalEditToken ref="editRef" @updateOk="hcUpdateOk" />
	</div>
</template>

<script setup lang="ts">
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { createVNode } from 'vue'

interface ModalTokenExpose {
	resetForm: () => void
	open: boolean
	loading: boolean
	mode: string
}

const addRef = ref<ModalTokenExpose>()
const editRef = ref<ModalTokenExpose>()
const delLoading = ref(false)

const store = cacheStore()
const route = useRoute()
const id = computed(() => route.params.id as any)

store.setTokenList(id.value)

const list = computed(() => store.tokenList)

const hcAddOk = async (mode: 'rw' | 'ro') => {
	addRef.value?.resetForm()
	addRef.value!.loading = true

	setTimeout(async () => {
		addToken({ cacheServiceId: id.value, mode })
			.then(async (res) => {
				if (res.id) {
					message.success('Add Success')
					await store.setTokenList(id.value)
					addRef.value!.open = false
					return
				}
				message.error('Request error!')
			})
			.finally(() => {
				addRef.value!.loading = false
			})
	}, 900)
}

const hcUpdateOk = (mode: 'rw' | 'ro') => {
	editRef.value!.loading = true
	setTimeout(() => {
		updateToken({ id: id.value, mode })
			.then((res) => {
				if (res.ok) {
					store.setTokenList(id.value)
					editRef.value!.open = false
					message.success('Update Success')
					return
				}
				message.error('Update Fail!')
			})
			.finally(() => {
				editRef.value!.loading = false
			})
	}, 900)
}

const deleteClick = (e: any) => {
	if (list && list.value?.length === 1) {
		return message.error('At least one token is required')
	}
	const showDeleteConfirm = () => {
		Modal.confirm({
			title: 'Are you sure you want to delete ?',
			icon: createVNode(ExclamationCircleFilled),
			okText: 'delete',
			cancelText: 'Cancel',
			okButtonProps: {
				danger: true,
			},
			onOk() {
				return new Promise((resolve, reject) => {
					delLoading.value = true
					message.loading({ content: 'Deleting...', key: 'del' })
					setTimeout(() => {
						deleteToken(e).then((res) => {
							if (res.ok) {
								message.success({
									content: 'Successfully deleted',
									key: 'del',
									duration: 1.5,
								})
								resolve('ok')
							} else {
								message.error({
									content: 'Delete failed!',
									key: 'del',
									duration: 1.5,
								})
								reject('failed')
							}
						})
						store.deleteTokenList(e)
					}, 900)
				}).catch(() => {
					message.error('delete error!')
				})
			},
		})
	}
	showDeleteConfirm()
}

const editClick = (e: any) => {
	editRef.value!.mode = e.mode
	editRef.value!.open = true
}

const hcCreate = () => {
	addRef.value!.open = true
}
</script>

<style lang="scss" scoped>
.top_add {
	@apply flex flex-row-reverse pb-8;
}
</style>
