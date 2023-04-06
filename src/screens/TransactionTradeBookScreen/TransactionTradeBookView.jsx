// react
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// context
import {
	executeGetTradeBookViewSecurityDetails,
	executeGetAttachmentDetails,
} from "../../redux/actions/tradeBookViewActions";

import { executeTradeBookView, executeTradeBookVerticalTimeline } from "../../redux/actions/tradeBookListActions";

// global
import { CONSTANTS } from "../../constants/constants";

// components
import View from "../../components/TradeBook/View";
import { connect } from "react-redux";
import BackToTop from "../../components/BackToTop/BackToTop";

function TransactionTradeBookView({ tradeBookList, tradeBookViewDetails }) {
	// const type = 'transaction';
	const location = useLocation();

	const { ORDEREQADD, CLIENTREQADD } = CONSTANTS.progNames;

	const type = location?.state?.type;
	// for customer use type as 'customer' else 'transaction'
	const [security, setSecurity] = useState(location?.state?.security);
	const [dealId, setDealId] = useState(location?.state?.dealId);
	const progName = type === "transaction" ? ORDEREQADD : CLIENTREQADD;

	const moveToNextPage = () => {
		const idx = tradeBookList?.findIndex((e) => e?.dealId === dealId);
		if (idx === tradeBookList?.length - 1) {
			return false;
		} else {
			const nextDealId = tradeBookList[idx + 1]?.dealId;
			const nextSecurity = tradeBookList[idx + 1]?.security;
			setSecurity(nextSecurity);
			setDealId(nextDealId);
		}
	};

	const moveToPreviousPage = () => {
		let idx = tradeBookList?.findIndex((e) => e?.dealId === dealId);
		idx = idx === 0 ? 0 : idx - 1;
		if (idx < 0 || idx === tradeBookList?.length - 1) {
			return;
		} else {
			const nextDealId = tradeBookList[idx]?.dealId;
			const nextSecurity = tradeBookList[idx]?.security;
			setSecurity(nextSecurity);
			setDealId(nextDealId);
		}
	};

	useEffect(() => {
		executeTradeBookView(dealId, progName);
		executeTradeBookVerticalTimeline(dealId, progName);

		const postObject = {
			data: { security: [security] },
		};
		executeGetTradeBookViewSecurityDetails(postObject);
		executeGetAttachmentDetails(progName, dealId);
	}, [dealId, progName, security]);

	return (
		<>
		<View
			progName={progName}
			type={type}
			data={{ ...location.state, ...tradeBookViewDetails }}
			onLeftPress={moveToPreviousPage}
			onRightPress={moveToNextPage}
		/>
		<BackToTop/>
</>
	);
}

const mapStateToProps = (state) => {
	return {
		tradeBookList: state?.tradeBookList?.tradeBookList?.schemedetail,
		tradeBookViewDetails: state?.tradeBookView.tradeBookViewDetails.tradeDetails,
	};
};

export default connect(mapStateToProps)(TransactionTradeBookView);
