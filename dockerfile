# create mongo
FROM mongo
LABEL org.opencontainers.image.authors="vincentchris@126.com"
EXPOSE 27017
VOLUME /workspace/data
