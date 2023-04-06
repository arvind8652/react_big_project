import { useState, useEffect } from "react";
import { Row } from "antd";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";
import { setPrimaryOrder } from "../../redux/actions/primaryMarketActions";

import {
  executeGetDependentLocationDataApi,
  executeGetClientAddressDetails,
} from "../../redux/actions/primaryMarketActions";
import { useDispatch } from "react-redux";

export const AddressDetails = ({
  selectValues = () => {},
  mailingOption = "",
  returnValidators = () => {},
  clientId = null,
  formValues = {},
  handleFormValues = () => {},
  mode = "add",
  stateEditOptions,
  cityEditOptions,
}) => {
  const dispatch = useDispatch();
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const setDisabledOption = mailingOption === "O" ? false : true;
  const [countryNotSelected, setCountryFalse] = useState(true);
  const [stateNotSelected, setStateFalse] = useState(true);

  useEffect(() => {
    if (mailingOption === "O") {
      handleFormValues({
        address: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
      });
    } else {
      executeGetClientAddressDetails(clientId, mailingOption).then((res) => {
        setStateOptions([{ data_value: res.state, display_value: res.stateName }]);

        setCityOptions([
          {
            data_value: res.city,
            display_value: res.cityName,
          },
        ]);

        handleFormValues({
          address: res.address,
          country: res.country,
          state: res.state,
          city: res.city,
          zipCode: res.addPin,
        });
      });
    }
  }, [mailingOption]);

  const addressDetailsForm = {
    address: {
      label: "Address",
      type: "Input",
      size: 16,
      required: true,
      placeholder: "Type Address",
      disabled: setDisabledOption,
      rules: returnValidators("Address"),
    },
    country: {
      label: "Country",
      type: "Select",
      required: true,
      ...selectValues("Country"),
      disabled: setDisabledOption,
      rules: returnValidators("Country"),
    },
    state: {
      label: "State",
      type: "Select",
      required: true,
      options: stateOptions,
      key: "data_value",
      value: "display_value",
      disabled: countryNotSelected ?? setDisabledOption,
      rules: returnValidators("State"),
    },
    city: {
      label: "City",
      type: "Select",
      required: true,
      options: cityOptions,
      key: "data_value",
      value: "display_value",
      disabled: stateNotSelected ?? setDisabledOption,
      rules: returnValidators("City"),
    },
    zipCode: {
      label: "Zip Code",
      type: "Input",
      required: true,
      dataType: "number",
      disabled: setDisabledOption,
      rules: returnValidators("ZipCode"),
    },
  };

  useEffect(() => {
    if (mode === "edit" && mailingOption === "O") {
      setCityOptions(cityEditOptions);
      setStateOptions(stateEditOptions);
    }
  }, [mode, mailingOption, cityEditOptions, stateEditOptions]);

  useEffect(() => {
    const updateObj = {
      mailAdd1: formValues.address,
      mailCountry: formValues.country,
      mailState: formValues.state,
      mailCity: formValues.city,
      mailPin: formValues.zipCode,
    };
    dispatch(setPrimaryOrder({ ...updateObj }));
  }, [formValues, dispatch]);

  const onChange = (key, value) => {
    switch (key) {
      case "country":
        executeGetDependentLocationDataApi(value, "state").then((optionsData) => setStateOptions(optionsData));
        setCityOptions([]);
        setStateOptions([]);
        setCountryFalse(false);
        setStateFalse(true);
        handleFormValues({ country: value, state: "", city: "" });
        break;
      case "state":
        executeGetDependentLocationDataApi(value, "city").then((optionsData) => setCityOptions(optionsData));
        setCityOptions([]);
        handleFormValues({ state: value, city: "" });
        setStateFalse(false);
        break;
      case "city":
        handleFormValues({ city: value });
        break;
      default:
        handleFormValues({ [key]: value });
        return;
    }
  };

  return (
    <Row>
      {Object.keys(addressDetailsForm).map((key) => (
        <GenericCardInput
          item={addressDetailsForm[key]}
          key={key}
          onChange={(option) => onChange(key, option)}
          value={formValues[key]}
          itemName={key}
        />
      ))}
    </Row>
  );
};
