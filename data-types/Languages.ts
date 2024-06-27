export type Lang = "am" | "en";
export const langList: { lang: Lang; label: string }[] = [
  { lang: "en", label: "English" },
  { lang: "am", label: "አማርኛ" },
] as const;

export const langs = ["en", "am"] as const;
