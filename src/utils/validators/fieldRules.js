import { CONSTANTS } from '../../constants/constants';
import validatorService from './validators';

const errorMessages = {
	newpaswd:
		"New Password should be set as per predefined Password Policy. Refer '!' button for detailed Password Policy.",
	userid: 'Special Character are not allowed',
	accnumber: 'Account number can only contain numbers and minimum length is 12'
};

export const registerRuleService = (form) => {
	const validator = validatorService(form);
	return {
		requiredRule: (fieldLabel, fieldType) => ({
			...(fieldType && fieldType.toLowerCase() === 'datetime' && { type: 'object' }),
			required: true,
			// message: '* ' + fieldLabel + ' number cannot be empty'
			message: '* ' + fieldLabel + ' cannot be empty'
		}),
		fieldLengthRule: (fieldLength) => ({
			// max: fieldLength,
			pattern: new RegExp('^[\\S\\d\\W]{0,' + fieldLength + '}$'),
			message: 'Maximum character length is ' + fieldLength
		}),
		validEmailRule: () => ({
			type: 'email',
			message: 'Incorrect emaild entered'
		}),
		regexMatchRule: (pattern, keyField, errorCode) => ({
			pattern: new RegExp(pattern),
			message:
				errorMessages[keyField.toLowerCase()] ||
				CONSTANTS.errorMessages[errorCode] ||
				'Invalid syntax'
		}),
		validateMatchingPasswords: () => ({
			validator: validator.validateMatchingPasswords,
			message: "Passwords don't match"
		}),
		checkWhiteSpace: (fieldLabel) => ({
			validator: validator.validateWhiteSpace,
			message: '* ' + fieldLabel + ' cannot be only blank space'
		})
	};
};
