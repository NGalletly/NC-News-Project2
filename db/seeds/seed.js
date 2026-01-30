const db = require("../connection");
const format = require("pg-format");

const seed = function ({ topicData, userData, articleData, commentData }) {
  return (
    db
      .query(`DROP TABLE IF EXISTS comments`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS articles`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS topics`);
      })

      //
      .then(() => {
        return db.query(`CREATE TABLE topics ( 
   slug VARCHAR(50) PRIMARY KEY,
   description VARCHAR(100),
   img_url VARCHAR(1000))`);
      })
      .then(() => {
        return db.query(`CREATE TABLE users ( 
    username VARCHAR(15) PRIMARY KEY,
    name VARCHAR(50),
    avatar_url VARCHAR(1000)
    )`);
      })
      .then(() => {
        return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        topic VARCHAR REFERENCES topics(slug),
        author VARCHAR REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000))`);
      })
      .then(() => {
        return db.query(`CREATE TABLE comments (
              comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) NOT NULL,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      })
      // data insertion
      // .then(()=>{
      //   return db.query(`INSERT INTO topics VALUES`)
      // })
      .then(() => {
        const formatData = topicData.map((topic) => {
          console.log([
            "topic.slug=",
            topic.slug,
            "topic.description=",
            topic.description,
            "topic.img_url=",
            topic.img_url,
          ]);
          return [topic.slug, topic.description, topic.img_url];
        });

        const insertData = format(
          `INSERT INTO topics (slug, description, img_url) VALUES %L`,
          formatData,
        );

        return db.query(insertData);
      })
  );
}; ////close of function

module.exports = seed;
