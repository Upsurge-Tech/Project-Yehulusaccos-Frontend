import { contentTypeStrings } from "@/data-types/Article";
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const adminTable = mysqlTable("admin", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 50 }).notNull(),
  password: varchar("password", { length: 50 }).notNull(),
});

export type AdminSQL = typeof adminTable.$inferSelect;

export const articleTable = mysqlTable("article", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type ArticleSQL = typeof articleTable.$inferSelect;

export const contentTable = mysqlTable("content", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("article_id")
    .notNull()
    .references(() => articleTable.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", contentTypeStrings).notNull(),
  data: text("data").notNull(),
  alt: text("alt"),
});

export type ContentSQL = typeof contentTable.$inferSelect;

// export const articleRelations = relations(articleTable, ({ many }) => ({
//   contents: many(contentTable, (content) => content.articleId),
// }));

// CREATE TABLE admin (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(50) NOT NULL,
//     password VARCHAR(50) NOT NULL
// );
// INSERT INTO admin (email, password) VALUES ('abebe@gmail.com', 'abebe');
// INSERT INTO admin (email, password) VALUES ('kebede@gmail.com', 'kebede');
// INSERT INTO admin (email, password) VALUES ('chala@gmail.com', 'chala');

// CREATE TABLE article(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(50) NOT NULL,
//     thumbnail VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
// );

// INSERT INTO article (title, thumbnail) VALUES ('የሳቅ ማህበረሰብ', 'sacco.jpg');

// CREATE TABLE content(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     article_id INT NOT NULL,
//     type ENUM('image', 'heading', 'paragraph') NOT NULL,
//     content TEXT NOT NULL,

//     FOREIGN KEY(article_id) REFERENCES article(id)
// );

// INSERT INTO content (article_id, type, content) VALUES (1, 'heading', 'የሳቅ ማህበረሰብ');
// INSERT INTO content (article_id, type, content) VALUES (1, 'paragraph', 'ሳቅ ማህበረሰብ የሚሆን ማህበረሰብ እንደሚሆን የሚለው ማህበረሰብ ነው።');
// INSERT INTO content (article_id, type, content) VALUES (1, 'image', 'sacco.jpg');

// SELECT * FROM content
