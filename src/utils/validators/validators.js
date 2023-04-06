const validatorService = (form) => ({
	fieldLengthValidator: (rule, value) => {
		if (value.length > rule.maxLength) {
			return Promise.reject(rule.message);
		}

		return Promise.resolve();
	},
	validateMatchingPasswords: (rule, value) => {
		if (value !== form.getFieldValue(['newPassword'])) {
			return Promise.reject(rule.message);
		}
		return Promise.resolve();
	},
	validateWhiteSpace: (rule, value) => {
		if (value && value.toString().length > 0 && !value?.replace(/\s/g, '').length) {
			// if (value && value.toString().length > 0 && value.trim()) {
			return Promise.reject(rule.message);
		}
		return Promise.resolve();
	}
});

export default validatorService;
