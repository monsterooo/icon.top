import Icon, { IconProps } from "./icon";

type Props = {
  icons: IconProps[];
};

const SearchIcons = (props: Props) => {
  return (
    <div className="grid grid-cols-icons gap-3">
      {props.icons?.map((child: any, key: number) => (
        <Icon {...child} key={key} />
      ))}
    </div>
  );
};

export default SearchIcons;
