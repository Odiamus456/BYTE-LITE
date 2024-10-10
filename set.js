 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUN2Q2Rvc3Y1cExxRlJ4cHE4NG1ZV2hCa1dnYnNVaVVCYWwzbTg0bWsxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVh2ZDBWWmk4VS9PUkFzN0ZIKzl3M0p6aVdiSCtNakp3VHc2c2NCaENBYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S25Vb2lQbFF3U2IvdFg2MjVQbTFxVHVFNEtOVitROEhrTFpSS1JRK2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGR0xkS1g2eE9WWGkxWXhqRzNWWEcyUk5mUDhEcFNDby9OSGd0b1pnbjFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlBOXU2QXErVzF5YVFORkFteXlTQ2x5OHFoaTRkTzdnTjhEYkZIbkxLbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ink1YnczV1lZZlNxbDlRMWJTZG9yZ2I2QTUySkNFdmRLTGsrRzkzL1NKMkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJrQW5udStSaWZRTDdBbUl2V2swMjJvRVRVMHkrODZyV0lndFIvazUzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFtKzBqa2hzdllrSzNPMjlBa1FIVEp1d0U1cTNMRSt2RmV5eGtIOFVoOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpvaWN5b09Venl4aUtIWHV6czk5MkNJYmtxd0JYa3VXTmFKQy9nOVBVaXJ0WDlmUEdpY2MrUzJveUxsdG1KTm5HcXd0Zm5nNE1Bd0hIelgvcDNTdUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6Ik9mb2x2TjV2ZC9rQnh6S2lyWm5NMXFWemN6YjRXUFhJekZDTWJNWkM2RHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI5NDE3MTIwOTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDg5OEZFRjBGNjA1NUUyM0Q5RTQ3M0QzNjZGRUQ5RUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODU3NDUzM30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI5NDE3MTIwOTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTZEQTU3NEE4QzhFQ0M4QUQyNUEwRDgxRDlBREZCNDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODU3NDUzM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQWxReGNBenZUbml5MmJiRE9qS2NVZyIsInBob25lSWQiOiJmZDE3ODgzYy1hMzkyLTQzYjQtYTc1ZC1lN2I4YTYxMzViZWIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEtrRU9XRGZuK2pKQldkc08waVZLMkZ0NndNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ1aVJxZ2xjV3lzTVJYd2JFd24yZWw4enRpMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGS1RBU0ZMMyIsIm1lIjp7ImlkIjoiMjI5NDE3MTIwOTY6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNZWhvbWUgQ2FuaXNpdXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tDMGc5c0dFS2pvbjdnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRCdmdHNWJtdjdxaDRxQVBTanZ0Zmg5anh2TlVtdjZpZTZISGQ3SUR1bEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtWTTE5YWdoVE9ma3lWc3ZmVDR5VXI2TCs2QS91YVdEejAzb0hlRVlidHRIN1pxOUdTQVRYWHV6dmtaMllTejZ1SEVoVlQ2THBmRGY3UXU0YTBtVkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNQ2xDUmVmMHZ0cnQrd1kxK2lJSHdHTktUU2pXTnVvYStRdnNDTXZuWDVXd25IcWFrSVFaQUlodTJ0Q1NVUElydGdvTkxwZzNsQXU3TzN4aTNTaldCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyOTQxNzEyMDk2OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFFiNEJ1VzVyKzZvZUtnRDBvNzdYNGZZOGJ6VkpyK29udWh4M2V5QTdwUyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODU3NDUxOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFZHEifQ==',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
