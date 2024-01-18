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
        const tagMatch = child?.t?.find((tag: any) => tag.startsWith(search));
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

  const handleToTranslate = () => {
    window.open(
      "https://www.figma.com/community/plugin/1328934748249923860/translate-top",
      "_blank"
    );
  };

  const handleToRemove = () => {
    window.open(
      "https://www.figma.com/community/plugin/1320229009762615569/remove-top",
      "_blank"
    );
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
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
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
      <div className="flex gap-4 items-center w-full p-2 bg-slate-100 text-sm">
        Follow us
        <div className="cursor-pointer" onClick={handleToTranslate}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="26"
              height="26"
              rx="6.5"
              fill="url(#paint0_linear_214_100)"
            />
            <path
              d="M21.0996 7.21094C21.0996 7.21094 11.502 10.9474 11.502 14.6212C11.502 18.295 11.502 20.6558 11.502 22.0391"
              stroke="url(#paint1_linear_214_100)"
              stroke-width="4.16406"
            />
            <path
              d="M4.92578 7.21094L21.0742 7.21094"
              stroke="white"
              stroke-width="4.16406"
            />
            <defs>
              <linearGradient
                id="paint0_linear_214_100"
                x1="0"
                y1="0"
                x2="26"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2086FD" />
                <stop offset="1" stop-color="#5920FD" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_214_100"
                x1="11.4999"
                y1="21.5975"
                x2="17.8489"
                y2="7.55145"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="cursor-pointer" onClick={handleToRemove}>
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="14" cy="14.4773" rx="13.8947" ry="14" fill="#27AE60" />
            <g clip-path="url(#clip0_3_2)">
              <path
                d="M18.5932 7.40791L15.1395 10.8616L13.8829 9.60496C13.5868 9.31057 13.1862 9.14533 12.7686 9.14533C12.351 9.14533 11.9504 9.31057 11.6543 9.60496L10.3977 10.8616L17.5104 17.9743L18.767 16.7177C19.0614 16.4216 19.2267 16.021 19.2267 15.6034C19.2267 15.1858 19.0614 14.7852 18.767 14.4891L17.5104 13.2325L20.9641 9.77883C21.2785 9.46443 21.4551 9.038 21.4551 8.59337C21.4551 8.14873 21.2785 7.72231 20.9641 7.40791C20.6497 7.0935 20.2233 6.91687 19.7786 6.91687C19.334 6.91687 18.9076 7.0935 18.5932 7.40791Z"
                stroke="white"
                stroke-width="1.32331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.188 11.6519C9.60735 14.0228 8.02673 14.418 5.65581 14.8131L11.9783 22.7162C13.5589 21.9259 16.7201 18.7647 16.7201 17.184"
                stroke="white"
                stroke-width="1.32331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5347 19.1598L7.63158 17.184"
                stroke="white"
                stroke-width="1.32331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_2">
                <rect
                  width="18.9674"
                  height="18.9674"
                  fill="white"
                  transform="translate(4.07519 5.32939)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
