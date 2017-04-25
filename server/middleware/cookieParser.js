const parseCookies = (req, res, next) => {
  const cookieJar = {};
  const cookies = req.headers.cookie;

  if (cookies) {
    const oreos = cookies.split('; ');

    oreos.forEach(cookie => {
      const [key, value] = cookie.split('=');
      cookieJar[key] = value;
    });
    
    req.cookies = cookieJar;
  }

  next();
};

module.exports = parseCookies;
