import HoC from "./HoC";
import Button from "./Button";

const ButtonWithHoC = HoC(Button);

export default function HoCwithButton() {
  const handleClick = () => {
    {
      alert("Button with HoC was clicked");
    }
  };
  return <ButtonWithHoC label="Click me" onClick={handleClick} />;
}
