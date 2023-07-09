import CodePen from './_hljs'

export default defineComponent({
	setup() {
		return () => (
			<div class="mt-6">
				<div class="space-y-6">
					<div>
						<CodePen
							password="Aks==tsodgkjsdfkgjfdjkjkliaoyi=="
							code="redis-cli -h mdawmdiwmda0oq.engula-aws-ap-northeast-1.montplex.com -p 8125 -a **********"
						/>

						<div class="mt-6 box-border flex list-none items-center break-words border border-[#ffe58f] rounded-lg bg-[#fffbe6] px-3 py-2 text-sm leading-[1.571] text-[rgba(0,0,0,0,0.88)]">
							<div>
								redis-cli supports TLS starting with version 6. If you are using
								version 5 or earlier, you should use{' '}
								<a
									class="text-[#1677ff]"
									href="https://www.stunnel.org/"
									role="link"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span class="mr-0.5">Stunnel</span>
									<span>
										<svg
											focusable="false"
											aria-hidden="true"
											viewBox="0 0 24 24"
											class="icon_root !text-base"
										>
											<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
										</svg>
									</span>
								</a>{' '}
								to establish a secure connection to the TLS enabled database{' '}
								<a
									class="text-[#1677ff]"
									href="https://www.digitalocean.com/community/tutorials/how-to-connect-to-managed-redis-over-tls-with-stunnel-and-redis-cli"
									role="link"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span>
										<svg
											focusable="false"
											aria-hidden="true"
											viewBox="0 0 24 24"
											class="icon_root !text-base"
										>
											<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
										</svg>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},
})
