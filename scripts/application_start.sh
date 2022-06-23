#!/bin/bash
#!/bin/bash
service httpd start
#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app


#navigate into our working directory where we have all our github files
cd /home/ec2-user/express-app
#download node and npm

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


#install node modules
npm install

#start our node app in the background
# npm run start > app.out.log 2> app.err.log < /dev/null & 