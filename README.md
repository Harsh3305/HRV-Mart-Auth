# HRV-Mart Authentication
![](https://img.shields.io/github/deployments/Harsh3305/HRV-Mart-Auth/Production?label=Production&style=plastic)
![](https://img.shields.io/github/deployments/Harsh3305/HRV-Mart-Auth/Preview?label=Preview&style=plastic)

## About Project
Authentication server and API-Gateway for HRV-Mart website.

## Installation
1) Clone this repo.
```
git clone git@github.com:Harsh3305/HRV-Mart-Auth.git
```
2) Open project directory
```
cd HRV-Mart-Auth
```
3) Install all dependency
```
npm i
```
4) Create .env file for environemnt variable
```
nano .env
PORT=3000
HASH_SECRET=SECRETE
JWT_SECRET=SECRETE
BACKEND_URL=http://localhost:8080
```

5) Run on local
```
npm run dev
```
## Test code on Preview server
Create a PR on this repo. Within few minutes, you will receive a preview server url in comments to test application.
## Deploy code on Production
Merge your PR on master. Code will automatically deployed on production.