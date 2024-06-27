#!/bin/sh

chmod -R 755 /app/node_modules
chown -R node:node /app/node_modules
mkdir -p /app/node_modules/.cache 
chown -R node:node /app/node_modules/.cache

exec "$@"
