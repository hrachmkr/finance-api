# API Endpoints


API prefix - `api/v1`. No authorization is required.

| Endpoint               | Method  | Parameter     | In     | Required | Access  |
|------------------------|---------|---------------|--------|----------|---------|


API prefix - `api/v1`. Authorization is required.

| Endpoint               | Method  | Parameter     | In     | Required | Access  |
|------------------------|---------|---------------|--------|----------|---------|
| ./users                | POST    | username      | body   | ✔        | admin   |
|                        |         | password      | body   | ✔        |         |
