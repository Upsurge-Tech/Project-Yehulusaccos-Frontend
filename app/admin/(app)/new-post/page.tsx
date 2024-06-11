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
import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaFileImage, FaParagraph, FaYoutube } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiLayoutTop2Fill } from "react-icons/ri";

interface FormState {
  title: { error: string; data: string };
  thumbnail: { error: string; data: string };
  unknown: string;
  contents: {
    error: string;
    type: "heading" | "paragraph" | "image" | "youtube";
    data: string;
    alt: string | null;
  }[];
}
const NewPost = () => {
  const [formState, setFormState] = useState<FormState>({
    title: { error: "", data: "title" },
    thumbnail: { error: "", data: "" },
    unknown: "",
    contents: [],
  });

  const addButtons = [
    {
      Icon: FaParagraph,
      label: "Paragraph",
      onClick: () => {
        setFormState({
          ...formState,
          unknown: "",
          contents: [
            ...formState.contents,
            {
              error: "",
              type: "paragraph",
              data: formState.unknown,
              alt: null,
            },
          ],
        });
      },
    },
    {
      Icon: FaFileImage,
      label: "Image",
      onClick: () => {
        setFormState({
          ...formState,
          unknown: "",
          contents: [
            ...formState.contents,
            {
              error: "",
              type: "image",
              data: formState.unknown,
              alt: "",
            },
          ],
        });
      },
    },
    {
      Icon: RiLayoutTop2Fill,
      label: "Heading",
      onClick: () => {
        setFormState({
          ...formState,
          unknown: "",
          contents: [
            ...formState.contents,
            {
              error: "",
              type: "heading",
              data: formState.unknown,
              alt: null,
            },
          ],
        });
      },
    },
    {
      Icon: FaYoutube,
      label: "Youtube Video",
      onClick: () => {
        setFormState({
          ...formState,
          unknown: "",
          contents: [
            ...formState.contents,
            {
              error: "",
              type: "youtube",
              data: formState.unknown,
              alt: null,
            },
          ],
        });
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between pb-9">
        <h1 className="text-primary font-bold text-2xl">Add new post</h1>
        <Button className="bg-blue-600">Publish</Button>
      </div>
      <form action="" className="flex flex-col gap-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            required
            placeholder="Enter title"
            value={formState.title.data}
            onChange={(e) => {
              setFormState({
                ...formState,
                title: { ...formState.title, data: e.target.value },
              });
            }}
          />
        </div>
        {formState.contents.map(({ error, type, data, alt }, i) => {
          const id = i + type;
          let label = "--";
          if (type === "heading") label = "Heading";
          if (type === "paragraph") label = "Paragraph";
          if (type === "image") label = "Image";
          if (type === "youtube") label = "Youtube Video";

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
              {type === "heading" && (
                <Input
                  id={id}
                  value={data}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newContents = [...formState.contents];
                    newContents[i] = {
                      ...newContents[i],
                      data: e.target.value,
                      error: value === "" ? "Can not be empty" : "",
                    };

                    setFormState({ ...formState, contents: newContents });
                  }}
                />
              )}
              {type === "paragraph" && (
                <Textarea
                  id={id}
                  value={data}
                  rows={5}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newContents = [...formState.contents];
                    newContents[i] = {
                      ...newContents[i],
                      data: e.target.value,
                      error: value === "" ? "Can not be empty" : "",
                    };
                    setFormState({ ...formState, contents: newContents });
                  }}
                />
              )}
              {type === "image" && (
                <ImageInput id={id} onChange={() => {}} value="" />
              )}
              {type === "youtube" && (
                <YoutubeInput id={id} onChange={() => {}} value="" />
              )}
              {error && <p className="text-destructive text-sm">{error}</p>}
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
                  {addButtons.map(({ Icon, label, onClick }) => (
                    <DropdownMenuItem
                      key={label}
                      className="flex flex-col py-3"
                      onClick={() => onClick()}
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
          <ImageInput id="thumb" onChange={() => {}} value={""} />
        </div>
      </form>
    </div>
  );
};

export default NewPost;

const ImageInput = ({
  id,
  onChange,
  value,
}: {
  id: string;
  onChange: (url: string) => void;
  value: string;
}) => {
  return (
    <div>
      <Input id={id} type="file" accept="image/*" />
    </div>
  );
};

const YoutubeInput = ({
  id,
  onChange,
  value,
}: {
  id: string;
  onChange: (url: string) => void;
  value: string;
}) => {
  return (
    <div>
      <Input id={id} accept="image/*" />
    </div>
  );
};
