<script setup>
import { createResource } from 'frappe-ui';

const props = defineProps({
	app: Object
});

const appSubscriptions = createResource({
	url: 'press.api.marketplace.get_subscriptions_list',
	params: {
		marketplace_app: props.app?.name
	},
	auto: true
});
</script>

<template>
	<Card :title="$t('Subscriptions')">
		<div v-if="appSubscriptions.data">
			<div v-if="appSubscriptions.data.length === 0">
				<p class="my-3 text-center text-base text-gray-600">
					{{ $t('MarketplaceAppSubscriptions_content_1') }}
				</p>
			</div>
			<div v-else class="divide-y">
				<div
					class="grid grid-cols-3 items-center gap-x-8 py-4 text-base text-gray-600 md:grid-cols-5"
				>
					<span class="col-span-2 md:col-span-1">{{ $t('Site') }}</span>
					<span>{{ $t('Status') }}</span>
					<span class="hidden md:inline">{{ $t('Price') }}</span>
					<span class="hidden md:inline">{{ $t('Active_For') }}</span>
					<span class="hidden md:inline">{{ $t('Contact') }}</span>
				</div>

				<div
					v-for="subscription in appSubscriptions.data"
					:key="subscription.site"
					class="grid grid-cols-3 items-center gap-x-8 py-4 text-base text-gray-900 md:grid-cols-5"
				>
					<p
						class="col-span-2 max-w-md truncate text-base font-medium text-gray-800 md:col-span-1"
					>
						{{ subscription.site }}
					</p>

					<p>
						<Badge :label="subscription.status" />
					</p>

					<p class="hidden md:inline">
						{{ $planTitle(subscription) || 'Free' }} /{{ $t('month') }}
					</p>

					<p class="hidden text-gray-700 md:inline">
						{{ subscription.active_days }}
						{{ subscription.active_days == 1 ? $t('day') : $t('days') }}
					</p>

					<a
						class="hidden underline md:inline"
						:href="`mailto:${subscription.user_contact}`"
					>
						{{ subscription.user_contact }}
					</a>
				</div>
			</div>
		</div>

		<div v-else-if="appSubscriptions.loading">
			<Button :loading="true">{{ $t('Loading') }}</Button>
		</div>

		<ErrorMessage :message="appSubscriptions.error" />
	</Card>
</template>
