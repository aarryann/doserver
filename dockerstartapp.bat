docker run -d --expose 4811 --env PORT=4811 -p 4811:4811 --add-host database:192.168.1.183 --name govex_api_wifi aarryann/doserver
rem docker run -d --expose 4811 --env PORT=4811 -p 4811:4811 --add-host database:192.168.208.158 --name govex_api_lan aarryann/doserver
rem docker run -d --expose 4811 --env PORT=4811 -p 4811:4811 --add-host database:172.17.210.49 --name govex_api aarryann/doserver
