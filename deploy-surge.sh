# Build react js app with production mode
yarn build

# Move to dist folder
cd dist

# Clone index.html into 200.html
cp index.html 200.html

# Start deploying via Surge
# The below command means deploy current folder to specific domain.
surge . winvu-photo-app.surge.sh