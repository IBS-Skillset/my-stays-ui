FROM public.ecr.aws/docker/library/node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM builder as final
RUN npm run build

FROM public.ecr.aws/nginx/nginx:alpine-amd64 as prod
COPY --from=final /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY set-env.sh env.js /usr/share/nginx/html/
RUN sed -i 's/\r$//' /usr/share/nginx/html/set-env.sh  && \
        chmod +x /usr/share/nginx/html/set-env.sh
CMD ["sh", "-c", "cd /usr/share/nginx/html/ && ./set-env.sh && nginx -g 'daemon off;'"]