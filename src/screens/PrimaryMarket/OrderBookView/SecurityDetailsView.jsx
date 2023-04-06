import { executeGetSecurityCard } from "../../../redux/actions/primaryMarketActions";
import React, { useEffect, useState } from "react";
import { SecurityCard } from "../SecurityCard";

export const SecurityDetailsView = ({ apiData, scheme, marketType = "Secondary" }) => {
	const [securityDetails, setSecurityDetails] = useState({
		security: {},
		isWaiver: false,
	});

	const [showCard, setShowCard] = useState(false);
	useEffect(() => {
		if (apiData?.security && scheme) {
			if (apiData.security.length > 0 && scheme.length > 0) {
				executeGetSecurityCard(apiData.security, scheme).then((secData) => {
					setSecurityDetails(secData[0]);
					setShowCard(true);
				});
			}
		}
	}, [apiData?.security, scheme]);

	return (
		<>{showCard && <SecurityCard data={securityDetails?.security} showBorder={false} marketType={marketType} />}</>
	);
};
