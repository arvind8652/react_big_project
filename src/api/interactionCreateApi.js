import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';
import moment from 'moment';

export const getInteractionCreateCsApi = () => {
	return Api.get(apiRequestUrls.getInteractionCreateCs);
};

export const postInteractionApi = (
	formData,
	prog,
	invitee,
	isMultiOcurrance,
	mode,
	relationDetail,
	UserID
) => {
	let miscellaneous = [];
	let miscellaneous1 = [];
	if (Array.isArray(formData.miscellaneous)) {
		formData.miscellaneous.map((item) =>
			miscellaneous?.push({
				Type: item.type,
				Miscellaneous: item.miscellaneous
			})
		);
	}
	if (Array.isArray(miscellaneous) && miscellaneous.length > 0) {
		const addSrlNo = (item, index) => {
			if (item?.SrlNo) {
				delete item?.SrlNo;
			}
			let dataObject = {};
			for (const prop in item) {
				// dataObject[`${prop}`]=item[prop]
				dataObject[`${prop}`] = item[prop];
			}
			dataObject['SrlNo'] = index;
			return dataObject;
		};
		miscellaneous.map((item, index) => {
			miscellaneous1.push(addSrlNo(item, index + 1));
		});
	}

	let followuplist;
	if (mode === 'edit') {
		followuplist = relationDetail?.map((each) => {
			if (!each.isAllDay)
				return {
					...each,
					startTime:
						each?.startTime !== null ? `${moment(each?.startTime)?.format('hh:mm')}` : null,
					endTime: each?.endTime !== null ? `${moment(each?.endTime)?.format('hh:mm')}` : null,
					inviteeadd: invitee,
					IsAllOccurrence: isMultiOcurrance
				};
			else
				return {
					...each,
					inviteeadd: invitee,
					startTime:
						each?.startTime !== null ? `${moment(each?.startTime)?.format('hh:mm')}` : null,
					endTime: each?.endTime !== null ? `${moment(each?.endTime)?.format('hh:mm')}` : null,
					IsAllOccurrence: isMultiOcurrance
				};
		});
	} else {
		followuplist = formData.RelationDetail?.map((each) => {
			const newStartDate = new Date(each?.startDate);
			// newStartDate.setDate(newStartDate.getDate() + 1);
			const newEndDate = new Date(each?.endDate);
			// newEndDate.setDate(newEndDate.getDate() + 1);
			if (!each.isAllDay)
				return {
					...each,
					startTime:
						each?.startTime !== null ? `${moment(each?.startTime)?.format('hh:mm')}` : null,
					endTime: each?.endTime !== null ? `${moment(each?.endTime)?.format('hh:mm')}` : null,
					inviteeadd: invitee,
					startDate: newStartDate,
					endDate: newEndDate
				};
			else
				return {
					...each,
					inviteeadd: invitee,
					startTime:
						each?.startTime !== null ? `${moment(each?.startTime)?.format('hh:mm')}` : null,
					endTime: each?.endTime !== null ? `${moment(each?.endTime)?.format('hh:mm')}` : null,
					startDate: newStartDate,
					endDate: newEndDate
				};
		});
	}
	// console.log('followupList-----', followuplist);
	const postObject = {
		data: {
			taskScheduler: {
				//  id: formData.id || null,
				activityID: formData.activityID || null,
				refType: formData.refType || formData.prospectType || null,
				refID:
					formData.prospectType === 'INTERNALADD'
						? UserID
						: formData.refID.value || formData.refID || null,
				refIDName: null,
				relationshipManager: formData.relationshipManager || null,
				comments: formData.remark || null,
				activityDate: null,
				activityNature: formData.activityNature || null,
				activityPurpose: formData.activityPurpose || formData.purpose || null,
				subject: formData.subject || null,
				notes: formData.description || null,
				opportunity: mode === 'edit' ? formData.opportunity : formData.opportunityName || null,
				branch: formData.branch || null,
				priority: formData.priority || null,
				followuplist: followuplist || null
			},
			Misc: {
				// Miscellaneous: [
				//   {
				//     Type: "Field1",
				//     Miscellaneous: "P",
				//   },
				//   {
				//     Type: "Field2",
				//     Miscellaneous: "L",
				//   },
				//   {
				//     Type: "Field3",
				//     Miscellaneous: "Text value for field3",
				//   },
				//   {
				//     Type: "Field4",
				//     MiscellaneousDate: "2020-01-01",
				//   },
				//   {
				//     Type: "Field5",
				//     MiscellaneousNumeric: "3",
				//   },
				// ],
				Miscellaneous: miscellaneous1,
				// progName: "INTERACTIONADD",
				progName: prog ? prog : 'ACTIVITYADD',
				SessionID: null,
				RefId: null
			},
			Attachment: formData.attachments || []
		}
	};
	return Api.post(apiRequestUrls.postInteraction, postObject);
};

export const getExistingInteractionApi = (refID) => {
	return Api.get(
		apiRequestUrls.getExistingInteraction + 'PROSPECTADD&RefId=' + `${refID}`
		// data.RefType +
		// "&RefId=" +
		// data.RefID
	);
};
