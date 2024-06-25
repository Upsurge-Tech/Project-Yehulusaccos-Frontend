"use client";
import Spinner from "@/components/Spinner";
import { AddBlockButton } from "@/components/admin/AddBlock";
import YoutubeInput from "@/components/admin/YoutubeInput";
import addContentButtonProps from "@/components/admin/addContentButtonProps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArticleFormState,
  FormContent,
  ImageFormContent,
} from "@/data-types/Article";
import { createArticle } from "@/lib/articles/createArticle.action";
import { editArticle } from "@/lib/articles/editArticle.action";
import {
  getVideoId,
  withNulledImages,
  withUploadedImages,
} from "@/lib/articles/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import HeadingInput from "./HeadingInput";
import ImageInput from "./ImageInput";
import ParagraphInput from "./ParagraphInput";

const ArticleForm = ({
  articleId,
  initialFormState,
}: {
  articleId?: number;
  initialFormState: ArticleFormState;
}) => {
  const isEdit = articleId !== undefined;

  const [formState, setFormState] =
    useState<ArticleFormState>(initialFormState);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const replaceContent = (content: FormContent, i: number) => {
    setFormState((formState) => {
      const newContents = [
        ...formState.contents.slice(0, i),
        content,
        ...formState.contents.slice(i + 1),
      ];
      return {
        ...formState,
        contents: newContents,
      };
    });
  };

  const swapContent = (i: number, j: number) => {
    setFormState((formState) => {
      const newContents = [...formState.contents];
      [newContents[i], newContents[j]] = [newContents[j], newContents[i]];
      return {
        ...formState,
        contents: newContents,
      };
    });
  };

  const validateYoutube = (youtubeLink: string): string => {
    if (!youtubeLink) return "Can not be empty";
    if (!getVideoId(youtubeLink))
      return "Please paste a valid youtube link (eg: https://www.youtube.com/watch?v=Abc123Abc )";
    else return "";
  };
  const validateImage = (state: ImageFormContent): string => {
    if (!state.src && !state.file) return "Can not be empty";
    else return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let state: ArticleFormState = formState;

    //ensure required* and other unresolved errors
    if (validateImage(state.thumbnail)) {
      document.getElementById(state.thumbnail.elementId)?.focus();
      setFormState({
        ...formState,
        thumbnail: {
          ...formState.thumbnail,
          error: validateImage(state.thumbnail),
        },
      });
      return;
    }

    for (let i = 0; i < state.contents.length; i++) {
      const content = state.contents[i];
      let error: string = "";
      let elementId: string = "";
      if (content.type === "youtube") {
        error = validateYoutube(content.youtubeLink);
        elementId = content.elementId;
      } else if (content.type === "image") {
        error = validateImage(content);
        elementId = content.elementId;
      }
      if (error && (content.type === "youtube" || content.type === "image")) {
        document.getElementById(elementId)?.focus();
        replaceContent({ ...content, error }, i);
        return;
      }
    }

    setError("");
    try {
      setIsLoading(true);
      const res = await withUploadedImages(state);
      if ("error" in res) {
        setError(res.error);
        return;
      }

      state = res;
      state = withNulledImages(state);
      console.log("submitting", state);
      if (isEdit) {
        console.log("sending to backend");
        const res = await editArticle(articleId as number, state);
        console.log("finished");
        if (!res) {
          router.push("/admin/posts");
          router.refresh();
        } else {
          setError(res.error);
          console.log("Friendly error", res.error);
        }
      } else {
        const res = await createArticle(state);
        if (typeof res === "number") {
          console.log("Article saved with id", res);
          router.push("/admin/posts");
          router.refresh();
        } else {
          setError(res.error);
          console.log("Friendly error", res.error);
        }
      }
    } catch (e) {
      setError("Something went wrong, Please try again later");
      console.log("Not friendly error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="h-full  flex flex-col gap-3"
    >
      <div className="flex justify-between pb-9">
        <h1 className="text-primary font-bold text-2xl">
          {isEdit ? "Edit post" : "Add new post"}
        </h1>
        <div>
          <div className="flex justify-end">
            <Button className="bg-tertiary" disabled={isLoading}>
              <Spinner spin={isLoading} />
              <span>{isEdit ? "Save" : "Publish"}</span>
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          required
          id="title"
          placeholder="Enter title"
          value={formState.title}
          onChange={(e) => {
            setFormState({ ...formState, title: e.target.value });
          }}
        />
      </div>
      {formState.contents.map((content, i) => {
        const label = `${i + 1}. ${addContentButtonProps.find((b) => b.type === content.type)?.label}`;
        return (
          <div key={i} className="relative">
            <div className="absolute right-0 top-[-5px] flex items-center text-black/70">
              <Button
                variant={"ghost"}
                size={"sm"}
                disabled={i === 0}
                type="button"
                onClick={() => swapContent(i, i - 1)}
              >
                <IoMdArrowDropupCircle />
              </Button>

              <Button
                variant={"ghost"}
                size={"sm"}
                disabled={i === formState.contents.length - 1}
                type="button"
                onClick={() => swapContent(i, i + 1)}
              >
                <IoMdArrowDropdownCircle />
              </Button>

              <Button
                className="text-destructive"
                variant={"ghost"}
                size={"sm"}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const newContents = [...formState.contents];
                  newContents.splice(i, 1);
                  setFormState({ ...formState, contents: newContents });
                }}
              >
                <MdCancel />
              </Button>
            </div>

            <Label htmlFor={content.elementId}>{label}</Label>
            {content.type === "heading" && (
              <HeadingInput
                index={i}
                formState={formState}
                setFormState={setFormState}
              />
            )}
            {content.type === "paragraph" && (
              <ParagraphInput
                index={i}
                formState={formState}
                setFormState={setFormState}
              />
            )}
            {content.type === "image" && (
              <div className="border p-2">
                <ImageInput
                  index={i}
                  validate={validateImage}
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>
            )}
            {content.type === "youtube" && (
              <YoutubeInput
                index={i}
                formState={formState}
                setFormState={setFormState}
                validate={validateYoutube}
              />
            )}
          </div>
        );
      })}

      <AddBlockButton formState={formState} setFormState={setFormState} />

      <div className="flex-1"></div>
      <div className="pt-9 ">
        <Label htmlFor="thumb">Thumbnail *</Label>
        <ImageInput
          index={-1}
          formState={formState}
          setFormState={setFormState}
          validate={validateImage}
        />
      </div>
    </form>
  );
};

export default ArticleForm;
