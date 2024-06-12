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
import { ArticleFormState } from "@/data-types/Article";
import error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaFileImage, FaParagraph, FaYoutube } from "react-icons/fa";
import { MdCancel, MdOutlineCleaningServices } from "react-icons/md";
import { RiLayoutTop2Fill } from "react-icons/ri";
import { saveArticle } from "./SaveFile";

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
    title: { error: "", title: "title", isDirty: false },
    thumbnail: { error: "", thumbnail: null, isDirty: false },
    unknown: "",
    contents: [
      { type: "heading", heading: "heading", error: "", isDirty: false },
    ],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const state = formState;
    if (
      state.title.error ||
      state.thumbnail.error ||
      state.contents.some((c) => c.error)
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("images", state.thumbnail.thumbnail as Blob);
    for (const content of state.contents) {
      if (content.type === "image") {
        formData.append("images", content.file as Blob);
      }
    }

    console.log("submitting", state);
    const copy = {
      ...state,
      contents: state.contents.map((c) =>
        c.type === "image" ? { ...c, file: null } : c
      ),
    };
    saveArticle(formData, copy);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
        <div className="flex justify-between pb-9">
          <h1 className="text-primary font-bold text-2xl">Add new post</h1>
          <Button className="bg-blue-600">Publish</Button>
        </div>
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Enter title"
            value={formState.title.title}
            onChange={(e) => {
              setFormState({
                ...formState,
                title: {
                  ...formState.title,
                  title: e.target.value,
                  isDirty: true,
                },
              });
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

              <Label htmlFor={id}>
                {i + 1}.{label}
              </Label>
              {content.type === "heading" && (
                <Input
                  id={id}
                  value={content.heading}
                  onChange={(e) => {
                    const newContents = [
                      ...formState.contents.slice(0, i),
                      {
                        type: content.type,
                        isDirty: true,
                        heading: e.target.value,
                        error: "",
                      },
                      ...formState.contents.slice(i + 1),
                    ];

                    setFormState({
                      ...formState,
                      contents: newContents,
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
                    const newContents = [
                      ...formState.contents.slice(0, i),
                      {
                        type: content.type,
                        isDirty: true,
                        paragraph: e.target.value,
                        error: "",
                      },
                      ...formState.contents.slice(i + 1),
                    ];

                    setFormState({
                      ...formState,
                      contents: newContents,
                    });
                  }}
                />
              )}
              {content.type === "image" && (
                <div className="border p-2">
                  <ImageInput
                    id={id}
                    onFile={(file) => {
                      const newContents = [
                        ...formState.contents.slice(0, i),
                        {
                          type: content.type,
                          isDirty: true,
                          file,
                          error: "",
                          alt: "",
                        },
                        ...formState.contents.slice(i + 1),
                      ];

                      setFormState({
                        ...formState,
                        contents: newContents,
                      });
                    }}
                    file={content.file}
                  />
                </div>
              )}
              {content.type === "youtube" && (
                <YoutubeInput
                  id={id}
                  onLinkChange={(link) => {
                    const newContents = [
                      ...formState.contents.slice(0, i),
                      {
                        type: content.type,
                        isDirty: true,
                        youtubeLink: link,
                        error: "",
                      },
                      ...formState.contents.slice(i + 1),
                    ];

                    setFormState({
                      ...formState,
                      contents: newContents,
                    });
                  }}
                  link={content.youtubeLink}
                />
              )}
              {error && (
                <p className="text-destructive text-sm">{content.error}</p>
              )}
            </div>
          );

          return null;
        })}

        <div className="relative text-black/80">
          <Input id="unknown" placeholder="Type / to choose a block" />
          <div className="absolute right-1 top-0 bottom-0 flex justify-center items-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="p-0">
                <button className="p-0">
                  <AiFillPlusSquare className="text-3xl " />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <div className="flex gap-3 px-3 items-center  text-black/80">
                  {addButtons.map(({ Icon, label, type }) => (
                    <DropdownMenuItem
                      onClick={() => {
                        let content;
                        if (type === "heading")
                          content = {
                            type,
                            heading: formState.unknown,
                            error: "",
                            isDirty: false,
                          };
                        if (type === "paragraph")
                          content = {
                            type,
                            paragraph: formState.unknown,
                            error: "",
                            isDirty: false,
                          };
                        if (type === "youtube")
                          content = {
                            type,
                            youtubeLink:
                              "https://www.youtube.com/watch?v=th8OswsAq6Q",
                            error: "",
                            isDirty: false,
                          };
                        else if (type === "image")
                          content = {
                            type,
                            alt: "",
                            file: null,
                            error: "",
                            isDirty: false,
                          };
                        if (!content) throw new Error("Unknown type" + type);
                        setFormState({
                          ...formState,
                          unknown: "",
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
        </div>
        <div>
          <Label htmlFor="thumb">Thumbnail *</Label>
          <ImageInput
            id="thumb"
            onFile={(file) => {
              setFormState({
                ...formState,
                thumbnail: { thumbnail: file, error: "", isDirty: true },
              });
            }}
            file={formState.thumbnail.thumbnail}
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
    <div className="relative max-w-[250px] border rounded">
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
        className="hidden"
      />
      {localUrl && (
        <Image
          src={localUrl}
          alt=""
          width={10}
          height={10}
          className="w-full max-h-[250px] object-contain bg-muted"
        />
      )}
    </div>
  );
};

const YoutubeInput = ({
  id,
  onLinkChange,
  link,
}: {
  id: string;
  onLinkChange: (url: string) => void;
  link: string;
}) => {
  const getVideoId = (): string | null => {
    try {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      return videoId || null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const videoId = getVideoId();
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div>
      <Input
        id={id}
        value={link}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="Paste the link to the video"
      />
      {videoId && (
        <div className="relative w-[250px] max-h-[250px]">
          <Link href={link} target="_blank">
            <FaYoutube className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-3xl text-white/80 " />
            <Image
              src={thumbnail}
              alt={`Youtube link`}
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
