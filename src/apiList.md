# API LIST here-- Devtinder API

## authRouter
1. POST/signup
2. POST/login
3. POST/logout

## profileRouter
4. GET/profile/view
5. PATCH/profile/edit
6. PATCH/profile/password

## connectionRequestRouter
7.  POST/ request/send/:status/:usrId
8.  POST/ request/review/:status/:userId


## userRouter
11. GET /user/requests/received
12. GET /user/connections
13. GET /user/feed - Gets you the profiles of other users n platform

status- ignored, interested, accepted, rejected.