# 11 — Output and exit codes

Type: grilling

Question: How does the CLI emit success output, errors, and exit codes?

Answer: Keep it simple. On success, print one JSON value to stdout (the API response body, including one-time credentials when the API returns them). On failure, print one JSON error object to stderr using the OpenAPI error shape when available. Do not add a `--pretty` mode. Exit `0` on success, `1` on usage/validation errors, and `2` on API or transport failures.
