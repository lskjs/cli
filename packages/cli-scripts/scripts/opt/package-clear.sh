#!/usr/bin/env bash
rm -rf node_modules && \
if [[ -d ./cra ]]
then
  sh ../../scripts/opt/package-cra-clear.sh
else
  true
fi && \

echo "OK"