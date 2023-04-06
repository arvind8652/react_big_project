export const CONSTANTS = {
	cardControlType: {
		BUTTON: 'BUTTON',
		DROPDOWN: 'DROPDOWN'
	},
	progNames: {
		LOGIN_N: 'LOGIN-N',
		AUTHPOSTLOGIN: 'AUTHPOSTLOGIN',
		FORGOTPASSWORD: 'FORGOTPASSWORD',
		LEADLIST: 'LEADLIST',
		OPPORTUNITYLIST: 'OPPORLIST',
		OPPORTUNITYVIEW: 'OPPORTUNITYVIEW',
		OPPORTUNITYADD: 'OPPORTUNITYADD',
		LEADADD: 'LEADADD',
		PROSPECTLIST: 'PROSPECTLIST',
		PROSPECTADD: 'PROSPECTADD',
		INTERACTIONADD: 'ACTIVITYADD',
		INTERACTION_ADD: 'INTERACTIONADD',
		INTERACTIONVIEW: 'ACTIVITYVIEW',
		INTERACTIONLIST: 'ACTIVITYLIST',
		TASKLIST: 'TASKLIST',
		CUSTOMERLIST: 'CLIENTLIST',
		CUSTOMERONBOARDINGLIST: 'CLIENTLIST',
		CLIENTADD: 'CLIENTADD',
		CLIENTREQADD: 'CLIENTREQADD',
		TASKVIEW: 'TASKVIEW',
		TASKADD: 'TASKADD',
		ACCOUNTREQADD: 'ACCOUNTREQADD',
		ACCOUNTLIST: 'ACCOUNTLIST',
		POHOLDING: 'POHOLDING',
		ORDERBOOKLIST: 'ORDERBOOKLIST',
		DOCUMENTS: 'DOCUMENTS',
		TRADEBOOKLIST: 'TRADEBOOKLIST',
		ORDEREQADD: 'ORDEREQADD',
		EXPLOREPRODUCT: 'EXPLOREPRODUCT',
		ACCDRILLDOWN: 'ACCDRILLDOWN',
		CLIENTSTATEMENT: 'RPT_CUSTST',
		REPORTMANAGER: 'REPORTMANAGER',
		SECURITYHOLDING: 'RPT_SECHOLDING',
		ORDERPRADD: 'ORDERPRADD',
		HOLDINGST: 'RPT_HOLDINGST',
		CUSTOMERLIST: 'RPT_CUSTLIST',
		DOCUMENTSTATUS: 'RPT_DOCSTATUS',
		ORDERSTATUS: 'RPT_ORDSTATUS',
		TRANSACTIONSTATEMENT: 'RPT_TRANSNST',
		WINNERLAGGERS: 'RPT_WLOUTCUST',
		CLIENTOVERVIEW: 'CLIENTOVERVIEW',
		ORDERSECADD: 'ORDERSECADD',
		ORDERSMADD: 'ORDERSMADD',
		MYCUSTOMERS: 'MYCUSTOMERS',
		FINGOAL: 'FINGOAL'
	},
	errorMessages: {
		// 101: 'Minimum 8 numbers are allowed',
		101: 'Minimum 8 numbers are required',
		102: 'Only AlphaNumeric Allowed',
		103: 'Input must contain at least one digit/lowercase/uppercase letter and be at least six characters long'
	},
	placeholders: {
		select: 'Select',
		enter: 'Enter',
		search: 'Search',
		date: 'Select Date',
		socialMedia: 'Enter @username',
		comments: 'Write your comments'
	},
	attachmentFileTypes: {
		uploadPhotoFileTypes: 'image/jpeg,image/gif,image/png',
		otherAttachmentsFileTypes:
			'image/jpeg,image/png,image/gif,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf',
		validationMessageUploadPhoto: 'File type png, jpeg,jpg,gif upto 1 MB is supported.',
		validationMessagesUploadOtherFiles:
			'File type Gif, JPEG, jpg, png, doc, docx, xls, xlsx and pdf upto 5 MB is supported.'
	},
	threeDotMenus: {
		opportunity: [
			'Modify',
			'Closed Won',
			'Closed Missed',
			'Take Note',
			'Create Task',
			'Create Interaction',
			'Create New Opportunity'
		]
	},
	loginForm: {
		formHeading: 'Sign in',
		userIdInputLabel: 'User name',
		passwordInputLabel: 'Password',
		forgotPassword: 'Forgot password?',
		rememberMe: 'Remember me',
		signInBtnText: 'Sign in',
		smallText: 'Don’t have an account? Please contact your administrator'
	},
	forgotPasswordForm: {
		heading: 'Account recovery',
		userIdInputLabel: 'User name',
		emailInputLabel: 'Email address',
		submitBtn: 'Submit',
		smallText: 'Please enter details to receive the OTP shortly',
		confirmPasswordInputLabel: 'Confirm Password',
		newPasswordInputLabel: 'New Password',
		resetOTPInputLabel: 'OTP',
		resetSuccessMessage: 'Successfully changed password',
		resetSuccessSignInInfo: 'You can now sign in using your new password',
		resetGoToSignInButtonLabel: 'Go to sign in',
		forSubHeading:
			'The one-time password for sign in has been sent to your registered mobile number +61 94****6578. You can request to resend the OTP ',
		passwordPolicyHeading: 'For a strong password',
		form: {
			heading: 'Change password'
		}
	},
	otpRequestForm: {
		formHeading: 'Verification',
		forSubHeading:
			'The one-time password for sign in has been sent to your registered mobile number +61 94****6578.',
		otpInputLabel: 'OTP',
		smallText: 'Didn’t receive your OTP yet? You can request to resend the OTP ',
		verifyBtnText: 'Verify'
	},
	sessionExpiry: {
		expiryMessage: 'Your session has been expired due to inactivity. Please sign in to continue',
		signInButton: 'Go to sign in',
		sessionExpired: 'Session Expired'
	},
	noInternetConnection: {
		noInternet: 'No internet connection',
		noInternetMessage: 'Please check your connection and try again',
		backButton: 'Go Back',
		tryAgainButton: 'Try again'
	},
	topBar: {
		contact: 'Contact',
		mail: 'Mail',
		language: 'Language',
		lastSignIn: 'Last Sign In',
		systemDate: 'System Date',
		curDate: 'Business Date',
		settings: 'Settings',
		signOut: 'Sign Out'
	},
	leadView: {
		topBar: {
			typeLabel: 'Type',
			sourceLabel: 'Source',
			interestLabel: 'Interest',
			sourcedBy: 'SourcedBy'
		},
		personalDetailsTitleLabel: 'Personal Details',
		personalDetails: {
			fullNameLabel: 'Full Name',
			categoryLabel: 'Category',
			dateOfBirthLabel: 'Date Of Birth',
			dateOfIncorporation: 'Date Of Incorporation',
			genderLabel: 'Gender',
			nationalityLabel: 'Nationality'
		},
		companyDetails: {
			companyNameLabel: 'Company Name',
			companyContactPerson: 'Contact Person',
			companyContactPersonDetails: 'Contact Person Details',
			companyDetails: 'Company Details'
		},
		contactDetailsTitleLabel: 'Contact Details',
		contactDetails: {
			contactNumberLabel: 'Contact Number',
			alternateNumberLabel: 'Alternate Number',
			emailIdLabel: 'Email Id',
			addressLabel: 'Address',
			cityLabel: 'City',
			countryLabel: 'Country',
			pincodeLabel: 'Pincode'
		},
		sourceDetailsTitleLabel: 'Source Details',
		sourceDetails: {
			sourceLabel: 'Source',
			remarksLabel: 'Remarks',
			sourceValueName: 'Name',
			referralTypeLabel: 'Referral Type',
			lastUpdateLabel: 'Last Update',
			sourcedByLable: 'SourcedBy'
		},
		relationshipManagerDetailTitleLabel: "Relationship Manager's Details",
		relationshipManagerDetail: {
			relationshipManagerLabel: 'Relationship Manager',
			branchLabel: 'Office'
		}
	},
	leadCreate: {
		headerTitle: 'Create Leads',
		subTitle: 'My Leads',
		cancel: 'Cancel',
		save: 'Save',
		draggerText: 'Upload Photo',
		draggerSubText: 'Drag and drop a photo to attach or select.',
		category: 'Category',
		nationality: 'Nationality',
		leadType: {
			title: 'Lead Type'
		},
		personalDetails: {
			title: 'Personal Details',
			salutation: 'Salutation',
			firstName: 'First Name',
			middleName: 'Middle Name',
			lastName: 'Last Name',
			dateOfBirth: 'Date of Birth',
			gender: 'Gender',
			suffix: 'Suffix'
		},
		companyDetails: {
			title: 'Company Details',
			companyName: 'Company Name',
			contactPerson: 'Contact Person',
			contactPersonDetails: "Contact Person's Details",
			dateOfIncorporation: 'Date of Incorporation'
		},
		contactDetails: {
			title: 'Contact Details',
			contact: 'Contact',
			alternateContact: 'Alternate Contact',
			emailID: 'Email ID',
			address: 'Address',
			zipCode: 'ZIP Code',
			country: 'Country',
			state: 'State',
			city: 'City',
			twitter: 'Twitter',
			facebook: 'Facebook',
			linkedln: 'Linkedln'
		},
		sourceDetails: {
			title: 'Source Details',
			source: 'Source',
			type: 'Type',
			name: 'Name',
			interestLevel: 'Interest Level',
			sourcedBy: 'Sourced By',
			remarks: 'Remarks'
		},
		relationshipManagerDetails: {
			title: "Relationship Manager's Details",
			relationshipManager: 'Relationship Manager',
			branch: 'Branch'
		}
	},
	opportunityCreate: {
		headerTitle: 'Create Opportunity',
		cancel: 'Cancel',
		save: 'Save',
		clientOrProspect: 'Client / Prospect Details',
		prospect: 'Prospect',
		client: 'Client',
		name: 'Name',
		relationshipManager: 'Relationship Manager',
		branch: 'Branch',
		office: 'Office',
		opportunityDetails: {
			title: 'Opportunity Details',
			opportunityName: 'Opportunity Name',
			opportunityType: 'Occupation',
			productOrService: 'Product / Service / Other Banking Relations',
			status: 'Status',
			open: 'Open',
			close: 'Close',
			startDate: 'Date',
			stage: 'Stage',
			probability: 'Probability',
			targetAmount: 'Target Amount',
			closureAmount: 'Closure Amount',
			expectedDate: 'Expected Date',
			closureDate: 'Closure Date',
			remarks: 'Remarks'
		},
		attachment: 'Attachment',
		text: ' Click or drag file to this area to upload',
		subText:
			'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
		miscellaneous: {
			header: 'Miscellaneous',
			add: 'Add',
			modalTitle: 'Miscellaneous',
			anniversaryDate: 'Anniversary Date'
		}
	},
	prospectView: {
		relationDetails: {
			relationLabel: 'Relation',
			dobLabel: 'Date of Birth',
			nameLabel: 'Full Name',
			emailLabel: 'Email-ID',
			mobileLabel: 'Contact Number'
		}
	},
	taskCreate: {
		headerTitle: 'Create Task',
		cancel: 'Cancel',
		save: 'Save',
		clientOrProspect: 'Client / Prospect Details',
		prospect: 'Prospect',
		client: 'Client',
		name: 'Name',
		relationshipManager: 'Relationship Manager',
		branch: 'Branch',
		opportunity: 'Opportunity',
		taskDetails: {
			title: 'Task Details',
			taskyName: 'Task Name',
			taskType: 'Occupation',
			productOrService: 'Product / Service',
			status: 'Status',
			open: 'Open',
			close: 'Close',
			startDate: 'Date',
			stage: 'Stage',
			probability: 'Probability',
			targetAmount: 'Target Amount',
			closureAmount: 'Closure Amount',
			expectedDate: 'Expected Date',
			closureDate: 'Closure Date',
			description: 'Description',
			subject: 'Subject'
		},
		attachment: 'Attachment',
		text: ' Click or drag file to this area to upload',
		subText:
			'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
		miscellaneous: {
			header: 'Miscellaneous',
			add: 'Add',
			modalTitle: 'Miscellaneous',
			anniversaryDate: 'Anniversary Date'
		}
	},
	filterSortOptions: {
		showAll: 'Show All',
		favourites: 'Favourites',
		recentlyModifiedLast30Days: 'Recently Modified (Modified in last 30 days)',
		createdLast7Days: 'Created in last 7 Days',
		createdLast15Days: 'Created in last 15 Days',
		createdLast30Days: 'Created in last 30 Days',
		recentlyCreated: 'Recently Created',
		recentlyModifiedModifiedLast7Days: 'Recently Modified (modified in last 7 days)',
		marketValueHightToLow: 'Market Value (High to Low)',
		creationDateNearToFar: 'Creation Date (Near to Far)',
		creationDateFarToNear: 'Creation Date (Far to Near)',
		modificationNearToFar: 'Modification Date (Near to Far)',
		modificationFarToNear: 'Modification Date (Far to Near)'
	},
	requiredFieldGenericMessage: 'Mandatory field/s are blank!',
	authorizeCode: {
		add: 1,
		documentUpload: 1,
		delete: 2,
		terminate: 2,
		view: 3,
		modify: 4,
		approveReject: 5,
		approve: 5,
		download: 6,
		assign: 7,
		downgrade: 8,
		convert: 9,
		upgrade: 9,
		endorse: 11,
		portfolioOverview: 12
	},
	loadingText: 'Loading...'
};
