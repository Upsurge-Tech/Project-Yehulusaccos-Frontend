import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";

const LanguageSwitcher: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localeActive = useLocale();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const newPath = pathname.replace(`/${localeActive}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <label className="flex items-center justify-between p-1 focus:outline-none focus-within:outline-none rounded-md">
      <select
        defaultValue={localeActive}
        className=" text-green-900 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">EN</option>
        <option value="am">አማ</option>
      </select>
      <FaGlobe className="ml-2 text-green-500" />
    </label>
  );
};

export default LanguageSwitcher;
