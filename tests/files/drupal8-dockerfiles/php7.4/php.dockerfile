ARG CLI_IMAGE
ARG IMAGE_REPO
FROM ${CLI_IMAGE:-builder} as builder

FROM uselagoon/php-7.4-fpm

COPY --from=builder /app /app
