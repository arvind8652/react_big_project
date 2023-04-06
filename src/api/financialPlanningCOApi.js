import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getFinancialPlanningCOCsApi = () => {
	return Api.get(apiRequestUrls.getFinancialPlanningCs);
};

export const getGoalApi = (data) => {
	return Api.get(apiRequestUrls.getFinancialGoalApi, data);
};
export const getIPSPDF = (clientId) => {
	return Api.post(apiRequestUrls.getIPSPDF, { data: clientId });
};

export const financialPlanningDeleteApi = (financialPlanningID, RecType) => {
	const postObject = {
		data: {
			finGoalId: financialPlanningID,
			RecType: RecType
		}
	};
	return Api.post(apiRequestUrls.financialPlanningDelete, postObject);
};

export const financialPlanningEditApi = (financialPlannningID) => {
	const postObject = {
		data: { Financialplanninigid: financialPlannningID }
	};
	return Api.post(apiRequestUrls.financialPlanningEdit, postObject);
};

export const getFinancialCalculation = (
	formData,
	goalName,
	goalType,
	clientId,
	pageId,
	financialPlanningID,
	riskProfileModelAns
) => {
	const returnPostObject = () => {
		switch (pageId) {
			case 1:
				return {
					FinancialPlanninigId: financialPlanningID ?? null,
					RefType: 'CLIENTADD',
					RefId: clientId,
					Remarks: formData?.remarks ?? null,
					GoalType: goalType,
					GoalName: goalName,
					PageId: 1,
					riskProfileModel: {},
					fPGoalCalculation: {
						RetirementAge: formData?.retirementAge ?? '0',
						LifeExpectancy: formData?.lifeExpectancy ?? '0',
						Inflation: formData?.inflation ?? '0',
						Monthlyexpense: formData?.monthlyexpense ?? '20000',
						Priority: formData?.priority ?? '0',
						RateOfReturn: formData?.rateOfReturn ?? '0',
						InvestmentHorizonForEF: formData?.investmenthorizonForEF ?? 0,
						ExpenseEarmark: formData?.expenseearmark ?? 0,
						CorpusRequired: formData?.targetWealth ?? 0, // Target Wealth is corpus required
						TargetCorpus: formData?.targetCorpus ?? 0,
						LoanPercentage: formData?.loanPercentage ?? 0
					},
					FPInvestmentModel: {}
				};
			case 2:
				return {
					FinancialPlanninigId: financialPlanningID ?? null,
					RefType: 'CLIENTADD',
					RefId: clientId,
					Remarks: formData?.remarks ?? null,
					GoalType: goalType,
					GoalName: goalName,
					RetirementAge: formData?.retirementAge ?? '0',
					LifeExpectancy: formData?.lifeExpectancy ?? '0',
					Inflation: formData?.inflation ?? '0',
					Monthlyexpense: formData?.monthlyexpense ?? '20000',
					Priority: formData?.priority ?? '0',
					ExpenseRetirement: formData?.expenseRetirement ?? null,
					TargetCorpus: formData?.targetCorpus ?? 0,
					PageId: 2,
					Endinvestmentdate: formData?.endinvestmentdate ?? null,
					RateOfReturn: formData?.rateOfReturn ?? '0',
					emergencyFundNeeded: formData?.emergencyFundNeeded ?? '0',
					InvestmentHorizonForEF: formData?.investmenthorizonForEF ?? 0,
					LoanPercentage: formData?.loanPercentage ?? 0,
					ExpenseEarmark: formData?.expenseearmark ?? 0,
					riskProfileModel: {},
					fPGoalCalculation: {},
					FPInvestmentModel: {}
				};
			case 3:
				return {
					FinancialPlanninigId: financialPlanningID ?? null,
					RefType: 'CLIENTADD',
					RefId: clientId,
					refIDName: null,
					Remarks: formData?.remarks ?? null,
					GoalType: goalType,
					GoalName: goalName,
					RetirementAge: formData?.retirementAge ?? '0',
					LifeExpectancy: formData?.lifeExpectancy ?? '0',
					Inflation: formData?.inflation ?? '0',
					Monthlyexpense: formData?.monthlyexpense ?? '20000',
					Priority: formData?.priority ?? '0',
					ExpenseRetirement: formData?.expenseRetirement ?? null,
					PercentageOfComplition: 0,
					TargetCorpus: formData?.targetCorpus ?? 0,
					PageId: 3,
					Endinvestmentdate: formData?.endinvestmentdate ?? null,
					RateOfReturn: formData?.rateOfReturn ?? '0',
					emergencyFundNeeded: formData?.emergencyFundNeeded ?? '0',
					InvestmentHorizonForEF: formData?.InvestmenthorizonForEF ?? 0,
					LoanPercentage: formData?.loanPercentage ?? 0,
					SessionID: null,
					riskProfileModel: riskProfileModelAns ?? {},
					fPGoalCalculation: {},
					FPInvestmentModel: {}
				};
			case 4:
				return {
					fPGoalCalculation: {},
					FinancialPlanninigId: financialPlanningID ?? null,
					RefType: 'CLIENTADD',
					RefId: clientId,
					GoalType: goalType,
					GoalName: goalName,
					RetirementAge: formData?.retirementAge ?? '0',
					LifeExpectancy: formData?.lifeExpectancy ?? '0',
					Inflation: formData?.inflation ?? '0',
					Monthlyexpense: formData?.monthlyexpense ?? '20000',
					Remarks: formData?.remarks ?? null,
					Priority: formData?.priority ?? '0',
					RateOfReturn: formData?.rateOfReturn ?? '0',
					InvestmentHorizonForEF: formData?.InvestmenthorizonForEF ?? 0,
					ExpenseEarmark: formData?.expenseearmark ?? 0,
					CorpusRequired: formData?.targetWealth ?? 0, // Target Wealth is corpus required
					TargetCorpus: formData?.targetCorpus ?? 0,
					LoanPercentage: formData?.loanPercentage ?? 0,
					emergencyFundNeeded: formData?.emergencyFundNeeded ?? '0',
					Endinvestmentdate: formData?.endinvestmentdate ?? null,
					riskProfileModel: {},
					PageId: 4,
					FPInvestmentModel: {
						SystematicInvestment: formData?.systematicInvestment ?? 0,
						StartInvestment: formData?.startInvestment ?? 0,
						PercentageInvestment: formData?.percentageInvestment ?? 0,
						Frequency: formData?.frequency ?? 0
					}
				};
			case 5:
				return {
					FinancialPlanninigId: financialPlanningID ?? null,
					RefId: clientId,
					GoalType: goalType,
					GoalName: goalName,
					PageId: 5
				};
			default:
				return {};
		}
	};

	return Api.post(apiRequestUrls.getCalculateApi, { data: returnPostObject() });
};

export const getFinancialPlanningGoalsCOApi = (clientId) => {
	return Api.post(apiRequestUrls.getFinancialPlanningGoalsCO, { data: clientId });
};
