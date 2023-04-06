export const retunListLength = (respObj, key) => {
	return respObj.hasOwnProperty(key) ? respObj[key].length : 0;
};

export const returSliceListFromObject = (respObj, key, slicedValue) => {
	return respObj.hasOwnProperty(key) ? respObj[key].slice(0, slicedValue) : [];
};

export const uniqueByKey = (array, key) => {
	return [...new Map(array.map((x) => [x[key], x])).values()];
};
