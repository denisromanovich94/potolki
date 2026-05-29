FROM node:22-alpine

RUN apk add --no-cache git

ARG UID=1000
ARG GID=1000
RUN deluser --remove-home node 2>/dev/null || true \
    && addgroup -g ${GID} elidom \
    && adduser -D -u ${UID} -G elidom -s /bin/sh elidom

WORKDIR /var/www/frontend

USER elidom

EXPOSE 3000

CMD ["sh", "-c", "if [ -f package.json ]; then npm run dev -- --host 0.0.0.0; else tail -f /dev/null; fi"]
