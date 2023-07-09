import {
	Dropdown,
	Menu,
	MenuItem,
	Badge,
	Avatar,
	MenuDivider,
} from 'ant-design-vue'

import { RouterLink } from 'vue-router'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	setup() {
		const router = useRouter()
		const store = userStore()
		const user = computed(() => store.user)

		/* const handleMineCommand = (command: string) => {
			switch (command) {
				case "out":
					logout();
					break;
				case "account":
					router.push({ path: "/account" });
					break;
				case "home":
					window.open("https://www.montplex.com/");
					break;
				case "pdfview":
					router.push({ path: "/pdf" });
					break;
				default:
					break;
			}
		}; */

		function logout() {
			store.user = null
			if (import.meta.env.MODE === 'development') {
				router.push({ path: '/', replace: true })
			} else {
				window.location.replace(
					import.meta.env.VITE_API_URL + '/engula/auth0/logout'
				)
			}
		}
		return () => (
			<Dropdown
				trigger={['click']}
				placement="bottomLeft"
				arrow={{ pointAtCenter: true }}
				overlay={
					<Menu>
						<MenuItem>
							<p>
								<b>{user?.value?.nickname}</b>
								{/* <b>liaoyi</b> */}
							</p>
							<p>{user?.value?.email}</p>
							{/* <p>2417276459@qq.com</p> */}
						</MenuItem>
						<MenuDivider />
						<MenuItem>
							<RouterLink to="/account">Account</RouterLink>
						</MenuItem>
						<MenuItem>
							<RouterLink to="/account/cost-explorer">Cost Explorer</RouterLink>
						</MenuItem>
						<MenuItem>
							<RouterLink to="/account/setting">Setting</RouterLink>
						</MenuItem>
						<MenuDivider />
						<MenuItem>
							<RouterLink to="/logout">Logout</RouterLink>
						</MenuItem>
					</Menu>
				}
			>
				<div class="h-10 flex items-center gap-1 rounded-r bg-[#3f3f46] pl-3 pr-2">
					{/*  src="https://avatars.githubusercontent.com/u/2417276459?v=4" */}
					<Badge count={0} dot>
						<Avatar
							src={user?.value?.picture}
							shape="circle"
							size={24}
							icon={<UserOutlined />}
							style={{ background: '#bfbfbf' }}
						/>
					</Badge>
					<CaretDownOutlined class="text-xs" />
				</div>
			</Dropdown>
		)
	},
})
