import Icon, { IconProps } from "./icon";

type Props = {
  icons: IconProps[];
};

const SearchIcons = (props: Props) => {
  return (
    <div className="grid grid-cols-icons gap-3">
      {props.icons?.map((child: any) => (
        <Icon {...child} key={child.n} />
      ))}
    </div>
  );
};

export default SearchIcons;
