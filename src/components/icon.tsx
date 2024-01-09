import { Loader2 } from "lucide-react";
import { CREATE_SVG } from "../constant";
import { useEffect, useState, useTransition } from "react";

export type IconProps = {
  p: string;
  n: string;
  t: string[];
};

const Icon = ({ p, n, t }: IconProps) => {
  const [isPending, startTransition] = useTransition();
  const [icon, setIcon] = useState("");

  const fetchIcon = async () => {
    startTransition(() => {
      fetch(`${process.env.GITHUB}/${p}/${n}`)
        .then((reponse) => {
          return reponse.text();
        })
        .then((svg) => {
          setIcon(svg);
        })
        .catch((error: any) => {
          console.error(error);
        });
    });
  };

  const handleCreate = () => {
    parent.postMessage({ pluginMessage: { type: CREATE_SVG, svg: icon } }, "*");
  };

  useEffect(() => {
    fetchIcon();
  }, []);

  return (
    <div className="aspect-square relative">
      {isPending ? (
        <div className="w-14 h-14 text-center inline-flex icon-wrapper bg-slate-100 rounded cursor-pointer">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div
          className="w-14 h-14 text-center inline-flex icon-wrapper bg-slate-100 hover:bg-slate-300 rounded cursor-pointer"
          dangerouslySetInnerHTML={{ __html: icon }}
          onClick={handleCreate}
        />
      )}
    </div>
  );
};

export default Icon;
