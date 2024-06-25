import { ArticleFormState } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import LangLabel from "./LangLabel";

const ParagraphInput = ({
  index,
  formState,
  setFormState,
}: {
  index: number;
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
}) => {
  const content = formState.contents[index];
  if (content.type !== "paragraph") throw new Error("Content type mismatch");
  return (
    <div className="flex flex-col gap-3" id={content.elementId}>
      <Label>{index + 1}. Paragraph</Label>
      {formState.langs.map((lang) => (
        <div className="relative" key={lang}>
          <LangLabel lang={lang} />
          <Textarea
            required
            id={content.elementId}
            value={content.paragraph[lang]}
            rows={5}
            onChange={(e) => {
              setFormState((s) =>
                replaceContent(
                  s,
                  {
                    ...content,
                    paragraph: { ...content.paragraph, [lang]: e.target.value },
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

export default ParagraphInput;
