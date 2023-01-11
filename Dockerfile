FROM node:18 as builder

WORKDIR /opt

COPY . .

RUN npm i
RUN npm run build

FROM httpd
COPY --from=builder /opt/dist/pizzastore/* /usr/local/apache2/htdocs/
