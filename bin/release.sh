#!/usr/bin/env bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  if [[ -z $SKIP_TESTS ]]; then
    npm run test:unit
    npm run test:e2e
  fi

  # build
  VERSION=$VERSION npm run prod

  # commit
  git add -A
  git commit -m "build: build $VERSION"
  # tag version
  npm version "$VERSION" --message "build: release $VERSION"

  # publish
  git push origin refs/tags/v"$VERSION"
  git push
  if [[ -z $RELEASE_TAG ]]; then
    npm publish
  else
    npm publish --tag "$RELEASE_TAG"
  fi
fi
