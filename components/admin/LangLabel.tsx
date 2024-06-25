import { Lang, langList } from "@/data-types/Languages";

export default function LangLabel({ lang }: { lang: Lang }) {
  return (
    <div className="absolute text-xs px-2 border shadow right-0 text-black/70">
      {langList.find((l) => l.lang === lang)?.label || lang}
    </div>
  );
}
