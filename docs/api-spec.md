# API Spec (draft)

Base URL: `/api`

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|---------------------------------------|
| POST   | /auth/register                  | Register farmer or admin              |
| POST   | /auth/login                     | Login, returns JWT                    |
| GET    | /farmers/                       | List farmers                          |
| GET    | /farmers/{id}                   | Farmer detail + EVI breakdown         |
| POST   | /farmers/                       | Create farmer profile                 |
| GET    | /schemes/                       | List schemes                          |
| GET    | /schemes/{id}                   | Scheme detail                         |
| GET    | /schemes/match/{farmer_id}      | Ranked scheme matches for a farmer    |
| POST   | /applications/                  | Submit application                    |
| PATCH  | /applications/{id}/status       | Admin approve/reject                  |
| GET    | /admin/applications             | Admin review queue                    |
| GET    | /analytics/district/{id}        | District-level analytics              |
| GET    | /analytics/state/{name}         | State-level analytics                 |

Full request/response schemas TBD as `app/schemas/` fills in.
