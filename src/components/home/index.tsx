import { useState, useEffect, useTransition, ChangeEvent } from "react";
import { Input } from "../ui/input";
import AllIcons from "../all-icons";
import { Loader2 } from "lucide-react";
import SearchIcons from "../search-icons";

const Home = () => {
  const [icons, setIcons] = useState<Record<any, any>[]>([]);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const fetchIcons = async () => {
    try {
      startTransition(() => {
        fetch(`${process.env.GITHUB}/icons.json`)
          .then((data) => {
            return data.json();
          })
          .then((json) => {
            setIcons(json);
          })
          .catch((error) => console.log("~~error~~", error));
      });
    } catch (error) {}
  };

  const getSearchIcons = () => {
    let searchIcons: any = [];
    icons.forEach((icon) => {
      icon?.children?.filter((child: any) => {
        const tagMatch = child?.tags?.find((tag: any) =>
          tag.startsWith(search)
        );
        if (tagMatch) {
          searchIcons.push(child);
        }
      });
    });

    return searchIcons;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <div className="flex w-screen h-screen flex-col">
      <div className="p-4">
        <Input
          onChange={handleSearchChange}
          placeholder="Please enter the icon description"
        />
      </div>
      <div className="flex-1 px-4 overflow-y-auto">
        {isPending ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Loader2 className="animate-spin h-8 w-8 " />
              Loading assets
            </div>
          </div>
        ) : search ? (
          <SearchIcons icons={getSearchIcons()} />
        ) : (
          <AllIcons icons={icons} />
        )}
      </div>
    </div>
  );
};

export default Home;
