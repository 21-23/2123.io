FROM node:8.9.3 as landing-build
WORKDIR /landing
COPY ./package*.json ./
RUN npm i
# copy only build-required file to avoid layers invalidation during "deploy" scripts changes
COPY ./app ./app
COPY ./webpack*.js ./
RUN npm run build

# https://wiki.alpinelinux.org/wiki/Nginx_as_reverse_proxy_with_acme_(letsencrypt)
FROM nginx:alpine

EXPOSE 80
EXPOSE 443

RUN apk update
RUN apk add acme-client libressl

RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d/*
COPY ./deploy/proxy/nginx.conf /etc/nginx/
COPY ./deploy/proxy/conf.d /etc/nginx/conf.d
COPY --from=landing-build /landing/dist /usr/share/nginx/2123/

RUN openssl dhparam -dsaparam -out /etc/nginx/dhparam.pem 4096

# certificate auto-refresh
COPY ./deploy/proxy/acme-client /etc/periodic/weekly/
RUN chmod +x /etc/periodic/weekly/acme-client
CMD ["/etc/periodic/weekly/acme-client"]
