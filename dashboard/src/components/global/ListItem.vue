<template>
	<div class="flex flex-wrap items-center justify-between py-3">
		<div class="mb-2">
			<div class="flex justify-start">
				<img class="mr-2 h-4" v-if="image" :src="image" :alt="title" />
				<h3 class="text-base font-medium text-gray-900">
					{{ title }}
				</h3>
			</div>
			<div class="mt-1" v-if="secondaryText || $slots.subtitle">
				<template v-if="secondaryText">
					<span class="text-base text-gray-600" v-html="secondaryText" />
				</template>
				<slot v-if="$slots.subtitle" name="subtitle" />
			</div>
		</div>
		<slot name="actions"></slot>
	</div>
</template>
<script>
export default {
	name: 'ListItem',
	props: ['image', 'title', 'subtitle', 'description'],
	computed: {
		secondaryText() {
			let text = this.subtitle || this.description || '';
			return text.replace('\n', '<br>');
		}
	}
};
</script>
