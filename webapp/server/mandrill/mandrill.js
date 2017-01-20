
try {


// server code
Mandrill.config({
  username: 'moneycomb1',  // the email address you log into Mandrill with. Only used to set MAIL_URL.
  key: 'jQfGDVYYlA37opS7uJYO9w',  // get your Mandrill key from https://mandrillapp.com/settings/index
  port: 587,  // defaults to 465 for SMTP over TLS
  host: 'smtp.mandrillapp.com',  // the SMTP host
  // baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
});



}catch(err) {
  console.log(err);
}