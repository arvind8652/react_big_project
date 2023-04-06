import GenericTable from "../../components/GenericTable/GenericTable";

const Accounts = () => {
  const tableSettings = {
    checkbox: false,
    expandableRow: false,
    favorite: false,
    pagination: false,
  };
  return (
    <>
      <GenericTable tableOptions={tableSettings} />
    </>
  );
};
export default Accounts;
