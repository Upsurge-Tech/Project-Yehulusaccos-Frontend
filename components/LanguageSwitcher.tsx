import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();

  const onSelectChange = (nextLocale: string) => {
    const newPath = pathname.replace(`/${localeActive}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <>
      <Select
        onValueChange={(nextLocale: string) => onSelectChange(nextLocale)}
        disabled={isPending}
        defaultValue={localeActive}
      >
        <SelectTrigger className="w-[90px] focus-visible:ring-0 rounded-lg">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="am">አማርኛ</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FaGlobe className="ml-2 text-green-500" />
    </>
  );
};

export default LanguageSwitcher;
