#!/usr/bin/env bash
echo "123123123 bootstrap";
echo "$(tput setaf 1)Hello, world$(tput sgr0)"
pwd
ls -la
IS_STORYBOOK=`node -e "const r = n => {try{return require(n)}catch(err){return{}}};console.log(Number(r('./.lskjs.js').storybook) || 0)"`
if [ $IS_STORYBOOK = '1' ]
then
echo "=========== lskjs.storybook is enabled, installing dependencies ===========" && \
cd .storybook && \
npm ci && \
rm -f ../packages/node_modules && \
ln -s `pwd`/node_modules ../packages/node_modules && \
cd .. && \
echo "=========== Storybook dependencies installed successful ==========="
fi &&
lerna exec -- npm run bootstrap
