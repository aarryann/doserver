rem docker run --expose 4811 --env PORT=4811 -p 4811:4811 --add-host database:192.168.1.183 --name govex_api aarryann/doserver
docker run -d --expose 4811 --env PORT=4811 -p 4811:4811 --add-host database:192.168.208.158 --name govex_api aarryann/doserver
