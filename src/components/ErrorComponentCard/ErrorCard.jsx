import React from 'react' 
import imgSrc from "../../assets/img/authScreen/noInternetConnection.svg"
import { CONSTANTS } from '../../constants/constants'
import './ErrorCard.scss'

// const mapError = (code) => { 
//     const defaultErrors = {
//         "404" : "Not Found",
//         "500" : "Server Error"
//     }
//     return defaultErrors[code];
// }

const ErrorCard = ({error}) => { 
    return (
        <>
        {
            error.code == "404" ? (
                <div className="error-card-screen">
                    <img src={imgSrc} className="tick" />
                    <div className="text">
                        {CONSTANTS.errorMessage.notFound} 
                    </div>
                </div> 
            ) : (
                <div className="error-card-screen-horizontal">
                    <img src={imgSrc} className="tick" />
                    <span className="error-text-body">
                    <div className="text">
                    {CONSTANTS.errorMessage.someError + "!"}
                        
                    </div>
                    <div className="small-text">
                        {CONSTANTS.errorMessage.someErrorDetail}
                    </div>
                    
                    </span>
                </div> 
            )
        }
        
        </>
    )

}

export default ErrorCard