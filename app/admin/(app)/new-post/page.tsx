"use client";
import Spinner from "@/components/Spinner";
import { AddBlockButton } from "@/components/admin/AddBlock";
import ImageInput from "@/components/admin/ImageInput";
import YoutubeInput from "@/components/admin/YoutubeInput";
import addContentButtonProps from "@/components/admin/addContentButtonProps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArticleFormState, FormContent } from "@/data-types/Article";
import { saveArticle } from "@/lib/articles/saveArticle.action";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdCancel } from "react-icons/md";

const NewPost = () => {
  const [formState, setFormState] = useState<ArticleFormState>({
    title: "title",
    thumbnail: { file: null, alt: "" },
    unknown: "",
    contents: [
      { type: "heading", heading: "heading" },
      { type: "paragraph", paragraph: "paragraph" },
    ],
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const state = formState;
    for (const content of state.contents) {
      if (content.type === "youtube" && content.error) {
        document.getElementById(content.elementId)?.focus();
        return;
      }
    }

    const formData = new FormData();
    formData.append("images", state.thumbnail.file as File);
    for (const content of state.contents) {
      if (content.type === "image") {
        formData.append("images", content.file as File);
      }
    }

    console.log("submitting", state);
    let nearestHeading: string = formState.title;
    const copy = {
      ...state,
      thumbnail: { file: null, alt: `Image describing ${nearestHeading}` },
      contents: state.contents.map((c) => {
        if (c.type === "heading") {
          nearestHeading = c.heading;
        }
        if (c.type === "image") {
          return {
            ...c,
            file: null,
            alt: `Image describing ${nearestHeading}`,
          };
        } else {
          return c;
        }
      }),
    };
    console.log(formData, copy);
    setError("");
    try {
      setIsLoading(true);
      const res = await saveArticle(formData, copy);
      if (typeof res === "number") {
        console.log("Article saved with id", res);
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError(res.error);
        console.log("Friendly error", res.error);
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
        <h1 className="text-primary font-bold text-2xl">Add new post</h1>
        <div>
          <div className="flex justify-end">
            <Button className="bg-tertiary" disabled={isLoading}>
              <Spinner spin={isLoading} />
              <span>Publish</span>
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
        const id = i + content.type;
        const label =
          i +
          1 +
          ". " +
          addContentButtonProps.find((b) => b.type === content.type)?.label;

        const replaceContent = (content: FormContent) => {
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

        return (
          <div key={i} className="relative">
            <button
              className="absolute right-1 top-1 text-destructive"
              onClick={(e) => {
                e.preventDefault();
                const newContents = [...formState.contents];
                newContents.splice(i, 1);
                setFormState({ ...formState, contents: newContents });
              }}
            >
              <MdCancel />
            </button>

            <Label htmlFor={id}>{label}</Label>
            {content.type === "heading" && (
              <Input
                required
                id={id}
                value={content.heading}
                onChange={(e) => {
                  replaceContent({
                    type: content.type,
                    heading: e.target.value,
                  });
                }}
              />
            )}
            {content.type === "paragraph" && (
              <Textarea
                required
                id={id}
                value={content.paragraph}
                rows={5}
                onChange={(e) => {
                  replaceContent({
                    type: content.type,
                    paragraph: e.target.value,
                  });
                }}
              />
            )}
            {content.type === "image" && (
              <div className="border p-2">
                <ImageInput
                  id={id}
                  file={content.file}
                  onFile={(file) => {
                    replaceContent({ type: content.type, file, alt: "" });
                  }}
                />
              </div>
            )}
            {content.type === "youtube" && (
              <YoutubeInput
                id={content.elementId}
                error={content.error}
                onLinkChange={(youtubeLink: string, error: string) => {
                  replaceContent({
                    elementId: content.elementId,
                    type: content.type,
                    youtubeLink,
                    error,
                  });
                }}
                link={content.youtubeLink}
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
          id="thumb"
          onFile={(file) => {
            setFormState({
              ...formState,
              thumbnail: { ...formState.thumbnail, file },
            });
          }}
          file={formState.thumbnail.file}
        />
      </div>
    </form>
  );
};

export default NewPost;
