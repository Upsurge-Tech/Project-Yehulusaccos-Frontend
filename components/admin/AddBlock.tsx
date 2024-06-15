import { ArticleFormState, FormContent } from "@/data-types/Article";
import { AiFillPlusSquare } from "react-icons/ai";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import addContentButtonProps from "./addContentButtonProps";

interface Props {
  formState: ArticleFormState;
  setFormState: (state: ArticleFormState) => void;
}

const AddBlock = ({ formState, setFormState }: Props) => {
  return (
    <div className="text-black/80 pt-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0">
          <Button
            variant={"ghost"}
            className="w-full flex justify-between border-2 p-3"
          >
            <span>Add a block</span>
            <AiFillPlusSquare className="text-3xl " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <div className="flex gap-3 px-3 items-center  text-black/80">
            {addContentButtonProps.map(({ Icon, label, type }, i) => (
              <DropdownMenuItem
                tabIndex={i}
                onClick={() => {
                  let content: FormContent;
                  if (type === "heading") {
                    content = { type, heading: formState.unknown };
                  } else if (type === "paragraph") {
                    content = { type, paragraph: formState.unknown };
                  } else if (type === "youtube") {
                    content = {
                      type,
                      elementId: `${Math.round(Math.random() * 10000)}`,
                      youtubeLink: "",
                      error: "",
                    };
                  } else if (type === "image") {
                    content = {
                      type,
                      alt: "",
                      file: null,
                      elementId: `img_${Math.round(Math.random() * 10000)}`,
                    };
                  } else {
                    throw new Error(`unknown content type ${type}`);
                  }

                  setFormState({
                    ...formState,
                    unknown:
                      type === "heading" || type === "paragraph"
                        ? ""
                        : formState.unknown,
                    contents: [...formState.contents, content],
                  });
                }}
                key={label}
                className="flex flex-col py-3"
              >
                <Icon className="text-2xl" />
                <p>{label}</p>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const AddBlockButton = AddBlock;
