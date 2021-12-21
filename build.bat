rmdir server\views /s
mkdir server\views
cd client
call yarn build
cd ..
cp client/build/* server/views -r