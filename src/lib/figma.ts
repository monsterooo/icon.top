import { CREATE_SVG } from "../constant";

type BasicProps = {
  type: string;
};

export async function handleMessage(msg: BasicProps & any) {
  const { type } = msg;
  try {
    const actions: any = {
      [CREATE_SVG]: handleCreateSvg,
      DEFAULT: () => {},
    };
    return actions[type ?? "DEFAULT"]?.(msg);
  } catch (error) {
    console.error(error);
  }
}

export async function handleCreateSvg(data: BasicProps & { svg: string }) {
  figma.createNodeFromSvg(data.svg);
}
