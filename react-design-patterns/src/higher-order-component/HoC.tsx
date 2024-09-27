interface ButtonProps {
  label: string;
  onClick?: () => void;
}
export default function HoC<T extends ButtonProps>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const handleClick = () => {
      console.log(`Click button ${props.label}`);
      if (props.onClick) {
        props.onClick();
      }
    };

    return <Component {...props} onClick={handleClick} />;
  };
}
