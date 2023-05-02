# Reservations

### Prerequisites

- java 17
- docker
- docker-compose

### To run project

- With h2 database `./mvnw clean install spring-boot:run -D"spring-boot.run.profiles"="h2"`
- With postgres database `./mvnw clean install spring-boot:run -D"spring-boot.run.profiles"="postgres"`
    - Before running make sure to start postgres DB using `docker-compose up postgres -d`
- With debug mode `./mvnw clean install spring-boot:run -D"spring-boot.run.profiles"="h2,debug"`

#### Setup accounts

| Role  | username | password |
|-------|----------|----------|
| admin | admin    | test     |
| user  | test     | test     |