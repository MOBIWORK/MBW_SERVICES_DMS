<template>
	<div class="space-y-4">
		<div
			v-for="field in fields"
			:key="field.fieldname"
			v-show="field.condition ? field.condition() : true"
		>
			<div class="flex space-x-4" v-if="Array.isArray(field)">
				<FormControl
					v-bind="getBindProps(subfield)"
					:key="subfield.fieldname"
					class="w-full"
					v-for="subfield in field"
				/>
			</div>
			<FormControl v-else v-bind="getBindProps(field)" />
			<ErrorMessage
				class="mt-1"
				v-if="requiredFieldNotSet.includes(field.fieldname)"
				:message="field.label + $t('is_required')"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Form',
	props: ['fields', 'modelValue'],
	emits: ['update:modelValue'],
	data() {
		return {
			requiredFieldNotSet: []
		};
	},
	methods: {
		onChange(value, field) {
			this.checkRequired(field, value);
			this.updateValue(field.fieldname, value);
		},
		updateValue(fieldname, value) {
			let values = Object.assign({}, this.modelValue, {
				[fieldname]: value
			});
			this.$emit('update:modelValue', values);
		},
		checkRequired(field, value) {
			if (field.required) {
				if (!value) {
					this.requiredFieldNotSet.push(field.fieldname);
					return false;
				} else {
					this.requiredFieldNotSet = this.requiredFieldNotSet.filter(
						f => f !== field.fieldname
					);
				}
			}
			return true;
		},
		getBindProps(field) {
			return {
				label: field.label || field.fieldname,
				type: this.getInputType(field),
				options: field.options,
				name: field.fieldname,
				modelValue: this.modelValue[field.fieldname],
				disabled: field.disabled,
				required: field.required || false,
				rows: field.rows,
				placeholder: field.placeholder,
				'onUpdate:modelValue': value => this.onChange(value, field),
				onBlur: e => this.checkRequired(field, e)
			};
		},
		getInputType(field) {
			return {
				Data: 'text',
				Int: 'number',
				Select: 'select',
				Check: 'checkbox',
				Password: 'password',
				Text: 'textarea'
			}[field.fieldtype || 'Data'];
		}
	}
};
</script>
