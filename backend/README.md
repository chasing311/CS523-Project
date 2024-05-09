## Getting Started

First, install dependencies:

```bash
pip3 install -r requirements.txt
```

Then, config your mongodb connection uri in app.yaml in the following format:

```yaml
database:
  db_uri: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
  db_password: password
```

Finally, run app.py.
