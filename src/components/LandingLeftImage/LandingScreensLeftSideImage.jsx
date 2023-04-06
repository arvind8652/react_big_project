import React from "react";
import manSittingOnCouch from "../../assets/img/authScreen/manSittingOnCouch.svg";


const LandingScreensLeftSideImage = ({ imgsrc, alternateImg }) => {

    return (
        <img src={imgsrc} alt={alternateImg} width={"100%"} />
    )
}

export default LandingScreensLeftSideImage;