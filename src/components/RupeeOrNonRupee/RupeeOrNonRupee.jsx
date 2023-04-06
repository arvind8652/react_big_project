import { connect } from "react-redux"



const RupeeOrNonRupee = ({authData, amount}) => {
    const NewData = () => {
        return new Intl.NumberFormat(authData == "INDIAN" ? "en-IN" : "en-US", {
            minimumFractionDigits: 0,
        }).format(amount);
    }

    return (
        <>
            {NewData()}
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        authData: state && state.auth && state.auth.user && state.auth.user.configResponse[0] && 
        state.auth.user.configResponse[0].value2
    }
}

export default connect(mapStateToProps)(RupeeOrNonRupee)