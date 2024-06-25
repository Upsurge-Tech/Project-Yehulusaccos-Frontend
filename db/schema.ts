import { contentTypeStrings } from "@/data-types/Article";
import { langs } from "@/data-types/Languages";
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

export const langTable = mysqlTable("lang", {
  id: mysqlEnum("id", langs).notNull().primaryKey(),
  label: varchar("label", { length: 50 }).notNull(),
});
export type LangSQL = typeof langTable.$inferSelect;

export const articleTable = mysqlTable("article", {
  id: int("id").autoincrement().primaryKey(),
  thumbnail: text("thumbnail").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type ArticleSQL = typeof articleTable.$inferSelect;

export const articleContentTable = mysqlTable("article_content", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("article_id")
    .notNull()
    .references(() => articleTable.id, { onDelete: "cascade" }),
});
export type ArticleContentSQL = typeof articleContentTable.$inferSelect;

export const contentTable = mysqlTable("content", {
  id: int("id").autoincrement().primaryKey(),
  langId: mysqlEnum("lang_id", langs)
    .notNull()
    .references(() => langTable.id, { onDelete: "cascade" }),
  contentId: int("content_id")
    .notNull()
    .references(() => articleContentTable.id, { onDelete: "cascade" }),
  type: mysqlEnum("type", contentTypeStrings).notNull(),
  data: text("data").notNull(),
  alt: text("alt"),
});
export type ContentSQL = typeof contentTable.$inferSelect;

export const articleLangTable = mysqlTable("article_lang", {
  langId: varchar("lang_id", { length: 10 })
    .notNull()
    .references(() => langTable.id, { onDelete: "cascade" }),

  articleId: int("article_id")
    .notNull()
    .references(() => articleTable.id, { onDelete: "cascade" }),
});

export type ArticleLangSQL = typeof articleLangTable.$inferSelect;
