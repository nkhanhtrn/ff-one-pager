
#!/bin/bash

# Remove any existing zip files to prevent UsageError
rm -f web-ext-artifacts/*.zip

npm run web-ext:build --overwrite-dest

sh zip-source.sh
