import { ArticleFormState } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";
import { Textarea } from "../ui/textarea";

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
    <Textarea
      required
      id={content.elementId}
      value={content.paragraph}
      rows={5}
      onChange={(e) => {
        setFormState((s) =>
          replaceContent(s, { ...content, paragraph: e.target.value }, index)
        );
      }}
    />
  );
};

export default ParagraphInput;
