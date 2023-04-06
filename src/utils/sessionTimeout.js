import { clearLocalStorage } from "./utils";

const inactivityTime = (reqTimeout) => {
  var time;
  const handleOnIdle = () => {
    clearLocalStorage();
    !(window.location.pathname === "/login") &&
      (window.location = "/sessionExpiry");
  };
  const resetTimer = () => {
    clearInterval(time);
    const timeoutInterval = reqTimeout * 1000 * 60;
    time = setTimeout(handleOnIdle, timeoutInterval);
    // time = setTimeout(handleOnIdle, 10000 );
  };

  // DOM Events
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  document.onclick = resetTimer;
  document.onwheel = resetTimer;
  document.onmousedown = resetTimer;
  document.ontouchstart = resetTimer;
  document.onkeydown = resetTimer;
  document.addEventListener("scroll", resetTimer, true);
};

export default inactivityTime;
