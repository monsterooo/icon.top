import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export const bytesToFile = (bytes: Uint8Array) => {
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const file = new File([blob], "image.png", { type: "image/png" });

  return file;
};

export function srcToFile(src: string, fileName: string, mimeType: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
}

export const fileToUint8Array = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer: any = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

type Upload = {
  fullPath: string;
  id: string;
  path: string;
};
export async function upload(file: File): Promise<Upload> {
  const supabase = createClient(
    process.env.SUPABASE_UPLOAD_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const extension = file.name.split(".").pop();
  const filename = uuidv4() + "." + extension;
  const res = await supabase.storage
    .from(process.env.SUPABASE_STORAGE!)
    .upload(`/images/${filename}`, file);

  return res.data as Upload;
}

export async function urlToObject(url: string, retryTimes = 3): Promise<File> {
  return new Promise((resolve, reject) => {
    let count = 1;

    const startFetch = () => {
      console.time(`load-image-time`);
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        console.timeEnd(`load-image-time`);

        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject("Create canvas ctx failed");
        }

        ctx.drawImage(image, 0, 0);

        canvas.toBlob(function (blob) {
          if (!blob) {
            return reject("Read blob failed");
          }
          // 创建一个File对象
          const file = new File([blob], "image.png");
          resolve(file);
          // 现在你可以使用file对象进行操作了
        }, "image/png");
      };

      image.onerror = () => {
        // 如果小于重试次数，则按当前重试次数*1000的延时加载图片
        if (count <= retryTimes) {
          console.log(`Load remote url failed, Try again in ${count} seconds`);

          setTimeout(() => {
            startFetch();
          }, count * 1000);
        } else {
          reject("Failed to load remote image");
        }
      };

      image.src = url;

      count += 1;
    };

    startFetch();
  });
}
