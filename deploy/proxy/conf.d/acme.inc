# Allow access to the ACME Challenge for Let's Encrypt
location ^~ /.well-known/acme-challenge {
    allow all;
    alias /var/www/acme;
}
