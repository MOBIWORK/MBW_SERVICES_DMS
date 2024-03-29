<template>
	<Dialog
		:options="{
			title: $t('Create_Code_Server'),
			actions: [
				{
					label: $t('Create'),
					variant: 'solid',
					loading: $resources.newCodeServer.loading,
					onClick: () => $resources.newCodeServer.submit()
				}
			]
		}"
		:modelValue="show"
		@after-leave="
			() => {
				$emit('close', true);
			}
		"
	>
		<template v-slot:body-content>
			<p class="text-base text-gray-700">
				{{ $t('CreateCodeServerDialog_content_1') }}
			</p>
			<div class="mt-4 flex">
				<input
					class="form-input z-10 w-full rounded-r-none"
					type="text"
					v-model="modelValue"
					placeholder="subdomain"
					@change="subdomainChange"
				/>
				<div class="flex items-center rounded-r bg-gray-100 px-4 text-base">
					.{{ domain }}
				</div>
			</div>
			<div class="mt-1">
				<div
					v-if="subdomainAvailable"
					class="text-sm text-green-600"
					role="alert"
				>
					{{ modelValue }}.{{ domain }} {{ $t('is_available') }}
				</div>
				<ErrorMessage :message="errorMessage" />
			</div>
		</template>
	</Dialog>
</template>

<script>
export default {
	name: 'CreateCodeServerDialog',
	props: ['version', 'show'],
	data() {
		return {
			dialogOpen: true,
			modelValue: '',
			errorMessage: null,
			// TODO: Add global state and get domain from there
			domain: 'frappe.space',
			subdomain: '',
			subdomainAvailable: false
		};
	},
	methods: {
		async subdomainChange(e) {
			this.subdomain = e.target.value;
			this.subdomainAvailable = false;

			let error = this.$validateSubdomain(this.subdomain);
			if (!error) {
				let subdomainTaken = await this.$call('press.api.spaces.exists', {
					subdomain: this.subdomain,
					domain: this.domain
				});
				if (subdomainTaken) {
					error = `${this.subdomain}.${this.domain} ${this.$t(
						'already_exists'
					)}.`;
				} else {
					this.subdomainAvailable = true;
				}
			}
			this.errorMessage = error;
			this.$emit('error', error);
		}
	},
	resources: {
		newCodeServer() {
			return {
				url: 'press.api.spaces.create_code_server',
				params: {
					subdomain: this.subdomain,
					bench: this.version,
					domain: this.domain
				},
				onSuccess(r) {
					this.$router.replace(`/codeservers/${r}/jobs`);
				},
				onError(e) {
					this.errorMessage = e.message;
				}
			};
		}
	}
};
</script>
