import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface MentionListProps {
  items: string[];
  command: (item: { id: string }) => void;
}

interface MentionListRef {
  onKeyDown: (args: { event: React.KeyboardEvent }) => boolean;
}

const RenderMentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        switch (event.key) {
          case "ArrowUp":
            upHandler();
            return true;
          case "ArrowDown":
            downHandler();
            return true;
          case "Enter":
            enterHandler();
            return true;
          default:
            return false;
        }
      },
    }));

    return (
      <div className="relative overflow-hidden rounded-md bg-white p-1 text-sm text-gray-800 shadow-md">
        {props.items.length ? (
          props.items.map((item, index) => {
            return (
              <button
                className={`block w-full rounded border border-transparent bg-transparent p-1 text-left transition-colors hover:bg-gray-200 ${
                  index === selectedIndex ? "border border-gray-900" : ""
                }`}
                key={item}
                onClick={() => selectItem(index)}
              >
                {item}
              </button>
            );
          })
        ) : (
          <div className="p-1">No Results</div>
        )}
      </div>
    );
  }
);

RenderMentionList.displayName = "RenderMentionList";
export default RenderMentionList;
