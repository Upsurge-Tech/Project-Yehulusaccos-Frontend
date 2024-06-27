import { ArticleFormState } from "@/data-types/Article";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lang, langList } from "@/data-types/Languages";
const SelectLang = ({
  formState,
  setFormState,
}: {
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
}) => {
  let value: string;
  const langSet = new Set(formState.langs);
  if (langSet.size === 0) {
    throw new Error("No language selected");
  }

  if (formState.langs.length === 1) {
    value = formState.langs[0];
  } else {
    value = "all";
  }
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (v === "all") {
          setFormState((s) => ({ ...s, langs: langList.map((l) => l.lang) }));
        } else {
          setFormState((s) => ({ ...s, langs: [v] as Lang[] }));
        }
      }}
    >
      <SelectTrigger className="max-w-[300px] border border-black/20 shadow rounded p-2 mb-6">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {langList.map(({ lang, label }) => (
            <SelectItem key={lang} value={lang}>
              {label}
            </SelectItem>
          ))}
          <SelectItem value="all">
            Both {langList.map((l) => l.label).join(" and ")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLang;
