import Icon from "./icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type Props = {
  icons: Record<any, any>[];
};

const AllIcons = ({ icons }: Props) => {
  return (
    <div className="w-full h-full">
      <Accordion type="single" collapsible className="w-full">
        {icons.map((icon) => (
          <AccordionItem value={icon.name} key={icon.name}>
            <AccordionTrigger>{icon.name}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-icons gap-3">
                {icon.children.map((child: any) => (
                  <Icon {...child} key={child.name} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AllIcons;
