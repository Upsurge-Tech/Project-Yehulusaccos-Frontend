import { Input } from "@/components/ui/input";
import { ArticleFormState } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";
import { Label } from "../ui/label";
import LangLabel from "./LangLabel";

const HeadingInput = ({
  index,
  formState,
  setFormState,
}: {
  index: number;
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
}) => {
  const content = formState.contents[index];
  if (content.type !== "heading") throw new Error("Content type mismatch");
  return (
    <div className="flex flex-col gap-3" id={content.elementId}>
      <Label>{index + 1}. Heading</Label>
      {formState.langs.map((lang) => (
        <div key={lang} className="relative">
          <LangLabel lang={lang} />
          <Input
            required
            id={content.elementId}
            value={content.heading[lang]}
            onChange={(e) => {
              setFormState((s) =>
                replaceContent(
                  s,
                  {
                    ...content,
                    heading: { ...content.heading, [lang]: e.target.value },
                  },
                  index
                )
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default HeadingInput;
