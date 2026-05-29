FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git curl zip unzip libzip-dev \
    postgresql-dev libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \
    icu-dev oniguruma-dev autoconf g++ make linux-headers \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_pgsql pgsql \
        gd zip intl bcmath opcache exif pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del autoconf g++ make linux-headers

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ARG UID=1000
ARG GID=1000
RUN addgroup -g ${GID} elidom \
    && adduser -D -u ${UID} -G elidom -s /bin/sh elidom

WORKDIR /var/www/backend

USER elidom

CMD ["php-fpm"]
