import { Input } from "@/components/ui/input";
import { ArticleFormState } from "@/data-types/Article";
import { Label } from "../ui/label";
import LangLabel from "./LangLabel";

const TitleInput = ({
  formState,
  setFormState,
}: {
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
}) => {
  const content = formState.title;
  if (content.type !== "title") throw new Error("Content type mismatch");
  return (
    <div className="flex flex-col gap-3" id={content.elementId}>
      <Label>Title *</Label>
      {formState.langs.map((lang) => (
        <div className="relative" key={lang}>
          <LangLabel lang={lang} />
          <Input
            required
            value={content.title[lang]}
            onChange={(e) => {
              setFormState((s) => ({
                ...s,
                title: {
                  ...s.title,
                  title: { ...s.title.title, [lang]: e.target.value },
                },
              }));
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TitleInput;
