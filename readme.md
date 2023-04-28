### Reservations

To run project

- With h2 database `./gradlew bootRun --args='--spring.profiles.active=h2`
- With postgres (default) database `./gradlew bootRun`
- With debug mode `./gradlew bootRun --args='--spring.profiles.active=debug`

Setup accounts

| Role  | username | password |
|-------|----------|----------|
| admin | admin    | test     |
| user  | test     | test     |