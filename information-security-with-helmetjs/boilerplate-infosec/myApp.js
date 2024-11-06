const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet.hidePoweredBy()) // hide powerred-by
app.use(helmet.frameguard({ action: 'deny' })); 
app.use(helmet.xssFilter()); // Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
app.use(helmet.noSniff()); //Avoid Inferring the Response MIME Type with helmet.noSniff()
app.use(helmet.ieNoOpen()); //Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

const ninetyDayinSecond = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDayinSecond,
  force: true,
}));

app.use(helmet.dnsPrefetchControl()); // Disable DNS Prefetching with helmet.dnsPrefetchControl()
app.use(helmet.noCache()); // Disable Client-Side Caching with helmet.noCache()

//Set a Content Security Policy with helmet.contentSecurityPolicy()
app.use(helmet.contentSecurityPolicy({
  directives: {
    'defaultSrc': ["'self'"],
    'scriptSrc': ["'self'", 'trusted-cdn.com'],
  },
}));

app.use(helmet({
  frameguard: {  // configure
    action: 'deny',
  },
  contentSecurityPolicy: {  // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    },
  },
  dnsPrefetchControl: false  // disable
}))














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
