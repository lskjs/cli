cd . && \
rm -rf package-lock.json && \
rm -rf node_modules && \
npm i && \
cd packages/cli && \
rm -rf package-lock.json && \
rm -rf node_modules && \
npm i && \
cd ../../packages/cli-utils && \
rm -rf package-lock.json && \
rm -rf node_modules && \
npm i && \
cd ../../packages/cli-scripts && \
rm -rf package-lock.json && \
rm -rf node_modules && \
npm i && \
cd ../../../packages/cli-scripts/files && \
rm -rf package-lock.json && \
rm -rf node_modules && \
npm i && \
npm i && \
echo "OK"
