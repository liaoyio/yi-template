import { Dropdown, Menu, MenuItem, SubMenu } from 'ant-design-vue'

import { CaretDownOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'

const onClick: MenuProps['onClick'] = ({ key }) => {
	console.log(`Click on item ${key}`)
}

export default defineComponent({
	setup(_, { emit }) {
		return () => (
			<Dropdown
				trigger={['click']}
				placement="bottomLeft"
				arrow={{ pointAtCenter: true }}
				overlay={
					<Menu onClick={onClick}>
						<MenuItem key="create">Create Team</MenuItem>
						<SubMenu key="switch" title="Switch Team">
							<MenuItem key="liaoyi">
								{/* <RouterLink to="/create-team">liaoyi</RouterLink> */}
								liaoyi
							</MenuItem>
							<MenuItem key="Montplex">
								{/* <RouterLink to="/create-team"></RouterLink>
								 */}
								Montplex
							</MenuItem>
						</SubMenu>
					</Menu>
				}
			>
				<div class="h-10 flex cursor-pointer items-center rounded-l bg-[#3f3f46] pl-3 pr-2">
					<div class="mr-2 leading-none">
						<div class="text-xs text-[#A1A1AA]">Team</div>
						<div class="text-sm">Personal</div>
					</div>
					<CaretDownOutlined class="text-xs" />
				</div>
			</Dropdown>
		)
	},
})
