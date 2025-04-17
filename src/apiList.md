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
7.  POST/ request/send/interested/:usrId
8.  POST/ request/send/ignored/:userId
9.  POST/ request/review/accepted/:requestId
10. POST/ request/review/rejected/:requestId

## userRouter
11. GET/user/connections
12. GET/user/requests/
13. GET/feed - Gets 

status- ignore, interested, accepted, rejected.