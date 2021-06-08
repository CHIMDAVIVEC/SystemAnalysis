### SystemAnalysis

## Installation

# Server
- git init
- git clone https://github.com/CHIMDAVIVEC/SystemAnalysis
- cd SystemAnalysis
- npm i
- move folder mongoose-auto-increment into node_modules folder with replace

# Client
- cd client
- npm i
- cd ..

# Start
- Before starting, you need to sed environment into these files:
- - /SystemAnalysis/.env (MongoDB URI, Token secret, Host, Port)
- - /SystemAnalysis/client/.env (Host and Port)
- - /SystemAnalysis/client/package.json (Proxy)
- Mainly, you can run both server and client using next command:
- npm run dev
