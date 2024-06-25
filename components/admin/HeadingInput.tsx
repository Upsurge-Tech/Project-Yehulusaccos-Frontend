import { Input } from "@/components/ui/input";
import { ArticleFormState } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";

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
    <Input
      required
      id={content.elementId}
      value={content.heading}
      onChange={(e) => {
        setFormState((s) =>
          replaceContent(s, { ...content, heading: e.target.value }, index)
        );
      }}
    />
  );
};

export default HeadingInput;
