import { useState } from "react";
import "./App.css";
import RichTextEditor from "./component/editor/rich-text-editor";

function App() {
  const [text, setText] = useState<string>("");
  const userMentionList = ["Ha", "Nguyen", "Tieu", "Yen"];
  return (
    <div className="flex mx-auto min-h-32">
      <RichTextEditor
        value={text}
        onChange={setText}
        isHightLightExtension={true}
        isLinkExtension={true}
        isTaskListExtension={true}
        isImageExtension={true}
        isMentionSuggestion={true}
        userMentionList={userMentionList}
      />
    </div>
  );
}

export default App;
