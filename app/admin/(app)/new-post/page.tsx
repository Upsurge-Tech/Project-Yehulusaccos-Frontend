"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArticleFormState, FormContent } from "@/data-types/Article";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaFileImage, FaParagraph, FaYoutube } from "react-icons/fa";
import { MdCancel, MdOutlineCleaningServices } from "react-icons/md";
import { RiLayoutTop2Fill } from "react-icons/ri";
import { saveArticle } from "./saveArticle";

const addButtons: {
  Icon: IconType;
  label: string;
  type: "paragraph" | "image" | "heading" | "youtube";
}[] = [
  {
    Icon: FaParagraph,
    label: "Paragraph",
    type: "paragraph",
  },
  {
    Icon: FaFileImage,
    label: "Image",
    type: "image",
  },
  {
    Icon: RiLayoutTop2Fill,
    label: "Heading",
    type: "heading",
  },
  {
    Icon: FaYoutube,
    label: "Youtube Video",
    type: "youtube",
  },
];

const NewPost = () => {
  const [formState, setFormState] = useState<ArticleFormState>({
    title: "title",
    thumbnail: { file: null, alt: "" },
    unknown: "",
    contents: [{ type: "heading", heading: "heading" }],
  });

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
    try {
      const res = await saveArticle(formData, copy);
      if (typeof res === "number") {
        console.log("Article saved with id", res);
      } else {
        console.log("Friendly error", res.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
        <div className="flex justify-between pb-9">
          <h1 className="text-primary font-bold text-2xl">Add new post</h1>
          <Button className="bg-blue-600">Publish</Button>
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
            addButtons.find((b) => b.type === content.type)?.label;

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
                {addButtons.map(({ Icon, label, type }, i) => (
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
                        content = { type, alt: "", file: null };
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
        <div className="pt-9">
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
    </div>
  );
};

export default NewPost;

const ImageInput = ({
  id,
  onFile,
  file,
}: {
  id: string;
  onFile: (file: File | null) => void;
  file: File | null;
}) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    console.log("here");
    reader.onload = (e) => {
      const url = (e.target?.result as string) || null;
      setLocalUrl(url);
    };
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file]);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="relative max-w-[200px] border rounded">
      <button
        className={` ${file ? "" : "hidden"} absolute right-0 top-0 bg-muted p-1 border `}
        onClick={(e) => {
          console.log("here");
          e.preventDefault();
          ref.current?.value && (ref.current.value = "");
          onFile(null);
          setLocalUrl(null);
        }}
      >
        <MdOutlineCleaningServices />
      </button>

      <label
        htmlFor={id}
        className={`${file ? "hidden" : ""}  p-3 flex gap-2 `}
      >
        <FaFileImage className="text-xl text-black/80" />
        <span>Add Image</span>
      </label>

      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/*"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
        required
        className="w-1 h-1 opacity-0 absolute right-1/2 bottom-0 "
      />
      {localUrl && (
        <Image
          src={localUrl}
          alt=""
          width={10}
          height={10}
          className="w-full max-h-[200px] object-contain bg-muted"
        />
      )}
    </div>
  );
};

const YoutubeInput = ({
  id,
  error,
  onLinkChange,
  link,
}: {
  id: string;
  error: string;
  onLinkChange: (link: string, error: string) => void;
  link: string;
}) => {
  const getVideoId = (link: string): string | null => {
    try {
      if (!link.includes("https://www.youtube.com/watch?v")) {
        return null;
      }
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      return videoId || null;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };

  const videoId = getVideoId(link);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Input
        required
        id={id}
        value={link}
        onChange={(e) => {
          const link = e.target.value;
          onLinkChange(
            link,
            !getVideoId(link)
              ? "Please paste a valid youtube link (eg: https://www.youtube.com/watch?v=Abc123Abc )"
              : ""
          );
        }}
        placeholder="Paste the link of the video"
      />

      {videoId && (
        <div className="relative w-[200px] max-h-[200px]">
          <Link href={link} target="_blank">
            <FaYoutube className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-3xl text-white/80 " />
            <Image
              src={thumbnail}
              alt={error ? "Broken Link" : `Youtube link`}
              width={250}
              height={250}
              className="rounded h-full w-full"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
