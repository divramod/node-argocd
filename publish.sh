#!/usr/bin/env sh
AREA=${1}
FEATURE=${2}
jq '.version |= (. | split(".") | .[2] |= tostring | .[0] + "." + .[1] + "." + (.[2] | tonumber + 1 | tostring))' package.json > tmp.$$.json && mv tmp.$$.json package.json
git pu "feat(${1}): ${2}" || true
pnpm build
NPM_PASSWORD=$(cat $HOME/.config/mo/plugs/npm/password-divramod)
NPM_TOKEN=$(cat $HOME/.config/mo/plugs/npm/token-divramod)
echo "NPM_TOKEN: ${NPM_TOKEN}"
npm-cli-login -u divramod-dev -e divramod@gmail.com -p ${NPM_PASSWORD}
pnpm publish
