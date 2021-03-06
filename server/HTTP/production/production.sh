# install mongodb

sudo apt update &&
sudo apt install mongodb && 
sudo systemctl status mongodb && 

# install git
sudo apt install git &&
sudo apt update &&
sudo apt install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip &&

#install curl
sudo apt install curl &&


# install cmake 

wget https://github.com/Kitware/CMake/releases/download/v3.15.2/cmake-3.15.2.tar.gz &&
tar -zxvf cmake-3.15.2.tar.gz &&
cd cmake-3.15.2 &&
./bootstrap &&
make &&
sudo make install &&


# install python

sudo apt install software-properties-common &&


# install node js
sudo apt-get update &&
sudo apt-get install build-essential libssl-dev && 
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh &&
bash install_nvm.sh &&
source ~/.profile &&
nvm install 12.10.0



# install node js dev dependencec

## env
npm i dotenv -g
## pm2
npm i pm2 -g 
## nodemoon 
npm i nodemon -g
##serve
npm i serve -g
#web-push
npm install web-push -g
#mongo-hacker 
npm install -g mongo-hacker

#pm2 
pm2 start main.js
pm2 start serve -s build

#git 

git clone -b '[???]' --single-branch --depth 1 https://github.com/IDONTSUDO/ERP_System
??? version tags
## node location
cd ERP_System/server/root/ && npm i && cd .. && cd .. && cd front/CRM/ && npm i && npm run  build




## react prod
serve -s build


## geoip-lite
node ./node_modules/geoip-lite/scripts/updatedb.js
## pm2 
pm2

## nginix

sudo apt-get install nginx
sudo apt-get install ufw

#  path /etc/nginx/sites-available/
#  nginix scripts
service nginx restart


web-push generate-vapid-keys