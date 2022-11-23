//the following code is modified from W3SChools example:
//https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie(cname) {
    let user = getCookie(cname);
    if (user != "") {
      alert("cookie is set to: " + user);
    } else {
      user = prompt("Please set the cookie value:", "");
      if (user != "" && user != null) {
        setCookie(cname, user, 365);
      }
    }
  }

  function checkCookieButton() {
    cname = prompt("what cookie name would you like to check?", "");
    if (cname != "" && cname != null) {
      checkCookie(cname);
    }
  }

  function loadCookies() {
    if (getCookie("preference") == "dark") {
      document.body.classList.add('dark');
    }
  }



window.onload = loadCookies();