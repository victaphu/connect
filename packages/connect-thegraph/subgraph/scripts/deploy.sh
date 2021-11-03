#!/bin/bash

# Arguments
USER=$1
NETWORK=$2
echo $USER
echo $NETWORK
# Build manifest
echo ''
echo '> Building manifest file subgraph.yaml'
./scripts/build-manifest.sh $NETWORK

# Generate types
echo ''
echo '> Generating types'
graph codegen

# Prepare subgraph name
FULLNAME=$USER/aragon-harmony
if [ "$STAGING" ]; then
  FULLNAME=$FULLNAME-staging
fi
echo ''
echo '> Deploying subgraph: '$FULLNAME

NETWORK=mainnet
# Deploy subgraph
graph deploy $FULLNAME \
  --ipfs http://graph.t.hmny.io:5001 \
  --node https://graph.t.hmny.io:8020 
