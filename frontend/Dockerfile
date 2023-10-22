FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /frontend
# Cache and Install dependencies
COPY package.json /frontend
COPY yarn.lock /frontend
RUN yarn install
# Copy app files
COPY . /frontend
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "dev" ]
