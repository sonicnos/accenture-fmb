import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface CardWrapperProps {
  children: React.ReactNode;
  titleLabel: string;
}

const CardWrapper = ({ children, titleLabel }: CardWrapperProps) => {
  return (
    <Card className="w-1/4">
      <CardHeader className="flex items-center">
        <CardTitle>{titleLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
