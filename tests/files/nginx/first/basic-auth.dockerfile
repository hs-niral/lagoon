ARG IMAGE_REPO
FROM uselagoon/nginx

ENV BASIC_AUTH_USERNAME=username \
    BASIC_AUTH_PASSWORD=password

COPY app/ /app/