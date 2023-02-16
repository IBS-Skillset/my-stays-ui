#!/bin/sh

cp -f /usr/share/nginx/html/env.js /tmp

if [ -n "$API_GATEWAY_URI" ]; then
sed -i -e "s|REACT_APP_API_GATEWAY|$API_GATEWAY_URI|g" /tmp/env.js
fi

if [ -n "$AUTH_SERVER_URI" ]; then
sed -i -e "s|REACT_APP_AUTH_SERVER|$AUTH_SERVER_URI|g" /tmp/env.js
fi

cat /tmp/env.js > /usr/share/nginx/html/env.js
