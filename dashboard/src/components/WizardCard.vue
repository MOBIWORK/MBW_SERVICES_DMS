<template>
	<div class="pb-10 sm:mt-5">
		<div class="sm:px-8">
			<div
				class="mx-auto mb-20 w-auto space-y-4 rounded-xl p-4 sm:max-w-6xl sm:border sm:p-8 sm:shadow-xl"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'WizardCard'
};
</script>
