export METEOR_SETTINGS='{"public": {"PLAID_ENV": "production", "PLAID_PUBLIC_KEY": "505704614c705498646afea6bffe29"}}'
# Plaid
export PLAID_PUBLIC_KEY="505704614c705498646afea6bffe29"
export PLAID_CLIENT_ID="5616c9f51abbf9e13f581fb2"
export PLAID_SECRET="488760dbd0560fbb10d5845bf03a24"
export PLAID_SERVER="https://tartan.plaid.com/"
# PRODUCTION
#export PLAID_ENV="production"
#export PLAID_SERVER="https://api.plaid.com/"
#export PLAID_API_ENDPOINT="https://api.plaid.com/"
#export MONGO_URL="mongodb://glenn:L1beration64@candidate.37.mongolayer.com:11079,candidate.21.mongolayer.com:11057/production?replicaSet=set-5641699de9bf3797d9000015"
#export MONGO_OPLOG_URL="mongodb://oploguser:L1beration64@candidate.37.mongolayer.com:11079/local?authSource=production"
# STAGE
export PLAID_ENV="tartan"
export PLAID_SERVER="https://tartan.plaid.com/"
export PLAID_API_ENDPOINT="https://tartan.plaid.com/"
export MONGO_URL="mongodb://glenn:L1beration64@candidate.21.mongolayer.com:11057,candidate.37.mongolayer.com:11079/stage-db?replicaSet=set-5641699de9bf3797d9000015"
export MONGO_OPLOG_URL="mongodb://glenn:L1beration64@candidate.21.mongolayer.com:11057,candidate.37.mongolayer.com:11079/local?authSource=stage-db"
# LOCAL
#export PLAID_ENV="tartan"
#export PLAID_SERVER="https://tartan.plaid.com/"
#export PLAID_API_ENDPOINT="https://tartan.plaid.com/"
#unset MONGO_URL
#unset MONGO_OPLOG_URL

