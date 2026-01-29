# NC News Seeding

Hello, welcome to the NC-News Project. To start please create your own .env files in root directory:
.env.test
.env.development

In these files please connect to the connection.js by placingthe following their respective .env.test and env.development files:
PGDATABASE = nc_news_test
PGDATABASE = nc_news

Once this is done please ensure you have .env.\* in your .gitignore

To check if this is working console.log the ENV variable in connection.js in jest test and in development environment to see it toggle from test to development.
const ENV = process.env.NODE_ENV || 'development'
