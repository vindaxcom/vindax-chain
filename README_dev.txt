apt install aptitude
aptitude install  miniupnpc libminiupnpc-dev

apt-get install qt5-default qt5-qmake qtbase5-dev-tools qttools5-dev-tools build-essential libboost-dev libboost-system-dev libboost-filesystem-dev libboost-program-options-dev libboost-thread-dev libssl-dev libdb++-dev
cd ~/vindax-chain
cd src
make -f makefile.unix
chmod -R 777 ~/vindax-chain/src


touch .vindax/vindax.conf
vim .vindax/vindax.conf
added rpcuser & rpcpassword
start wallet
 ./vindaxd --daemon -txindex
// check processing
 pidof vindaxd
//





