import { IconType } from "react-icons";
import { FaParagraph, FaFileImage, FaYoutube } from "react-icons/fa6";
import { RiLayoutTop2Fill } from "react-icons/ri";

const addContentButtonProps: {
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

export default addContentButtonProps;
