# IMPORTANT: Don't use this Dockerfile in your own Sapper projects without also looking at the .dockerignore file.
# Without an appropriate .dockerignore, this Dockerfile will copy a large number of unneeded files into your image.

FROM mhart/alpine-node:12

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-12

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 4811

CMD ["node", "start.js"]

#docker build -t aarryann/doserver .
#docker run --expose 4811 --env PORT=4811 -p 4811:4811 --name govex_api --add-host database:192.168.1.183 aarryann/doserver
#docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" 6e2391644986
#psql -U appuser -h 192.168.1.183