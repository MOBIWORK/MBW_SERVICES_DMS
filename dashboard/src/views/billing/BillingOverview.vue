<template>
	<div class="space-y-5">
		<AlertBillingInformation
			v-if="checkRefresh"
			@updated="checkRefresh = !checkRefresh"
		/>
		<BillingSummary :checkRefresh="checkRefresh" />
	</div>
</template>

<script>
import BillingSummary from './BillingSummary.vue';
import AlertBillingInformation from '@/components/AlertBillingInformation.vue';

export default {
	name: 'BillingOverview',
	pageMeta() {
		return {
			title: 'Billing - MBW Cloud'
		};
	},
	data() {
		return {
			checkRefresh: true
		};
	},
	props: ['invoiceName'],
	components: {
		BillingSummary,
		AlertBillingInformation
	}
};
</script>
