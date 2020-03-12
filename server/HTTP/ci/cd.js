let node_ssh = require('node-ssh')
let logger = require('node-color-log');
let process = require('process');

require("dotenv").config()


let ssh = new node_ssh()

ssh.connect({
  host: `${process.env.SSH_HOST}`,
  username: `${process.env.SSH_USERNAME}`,
  port: `${process.env.SSH_PORT}`,
  password: `${process.env.SSH_PASSWORD}`,
  tryKeyboard: true,
  onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
      if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
        finish([password])
      }
    }
}).then(function(){
  ssh.execCommand(`${process.env.BASH_SSH_COMAND}`, { cwd:`${process.env.SSH_CWD}` }).then(function(result) {
    logger.info(result.stdout)
    process.exit() 
  })
}) 
