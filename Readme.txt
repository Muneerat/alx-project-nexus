POST /auth/users/create_admin/ CREATES NEW ADMIN 
GET /auth/users/  Allows only admin to view list of all users


POST api/polls/ → Create poll (admin only)


POST api/polls/{id}/options/ → Add poll option (admin only)

auth/api/docs/ → interactive Swagger UI API DOCUMENTATION

GET /auth/users/role-counts/ Newly added


POST /auth/register/ -- Done
POST api-auth/login/ i -- Done
POST /api-auth/logout/ -- done
auth/me #Done 

GET api/polls/ → List active polls Done
GET api/polls/{id}/ → Retrieve poll
POST api/polls/{id}/vote/ → Vote on a poll (authenticated) done
GET api/polls/{id}/results/ → Poll results 



add pagination
add refresh token - fix expire token 