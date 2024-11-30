import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import {
  type Editor,
  EditorContent,
  Extensions,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

import MentionSuggestion from "./helper/mention-suggestions";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";

type ToggleButtonProps = {
  isToggle?: boolean;
  onToggle?: () => boolean;
  onPress?: () => void;
  children: React.ReactNode;
};

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  isEdit?: boolean;
  isHightLightExtension?: boolean;
  isLinkExtension?: boolean;
  isTaskListExtension?: boolean;
  isImageExtension?: boolean;
  isMentionSuggestion?: boolean;
  userMentionList?: string[];
};

type RichTextEditorToolbarProps = {
  editor: Editor;
  isHightLightBtn?: boolean;
  isLinkBtn?: boolean;
  isTaskListBtn?: boolean;
  isImageBtn?: boolean;
  isMention?: boolean;
  userMentionList?: string[];
};

const ToggleButton = ({
  isToggle = false,
  onToggle,
  onPress,
  children,
}: ToggleButtonProps) => {
  const variant = isToggle ? "destructive" : "secondary";
  const onClick = onToggle ? onToggle : onPress;

  return (
    <Button
      size="sm"
      variant={variant}
      onClick={onClick}
      aria-pressed={isToggle}
    >
      <>{children}</>
    </Button>
  );
};

const RichTextEditorToolbar = ({
  editor,
  isHightLightBtn,
  isImageBtn,
  isLinkBtn,
  isTaskListBtn,
}: RichTextEditorToolbarProps) => {
  const setUnsetLink = useCallback(() => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (!editor) return;
    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("image").clearContent().run();
      return;
    }

    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  // Show all extensions are installed
  //console.log(editor.extensionManager.extensions.map((ext) => ext.name))
  return (
    <div className="flex flex-row flex-wrap items-center gap-1 rounded-b-md border bg-transparent p-1">
      <ToggleButton
        isToggle={editor.isActive("bold")}
        onToggle={() => editor.chain().focus().toggleBold().run()}
      >
        <Icon name="Bold" className="size-4" />
      </ToggleButton>
      <ToggleButton
        isToggle={editor.isActive("italic")}
        onToggle={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icon name="Italic" className="size-4" />
      </ToggleButton>
      <ToggleButton
        isToggle={editor.isActive("strike")}
        onToggle={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icon name="Strikethrough" className="size-4" />
      </ToggleButton>

      {isHightLightBtn && (
        <ToggleButton
          isToggle={editor.isActive("highlight")}
          onToggle={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Icon name="Highlighter" className="size-4" />
        </ToggleButton>
      )}

      <ToggleButton
        isToggle={editor.isActive("bulletList")}
        onToggle={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icon name="List" className="size-4" />
      </ToggleButton>
      <ToggleButton
        isToggle={editor.isActive("orderedList")}
        onToggle={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icon name="ListOrdered" className="size-4" />
      </ToggleButton>

      <ToggleButton
        isToggle={editor.isActive("blockquote")}
        onToggle={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icon name="Quote" className="size-4" />
      </ToggleButton>
      <ToggleButton
        isToggle={editor.isActive("codeBlock")}
        onToggle={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icon name="Code" className="size-4" />
      </ToggleButton>

      {isTaskListBtn && (
        <ToggleButton
          isToggle={editor.isActive("taskList")}
          onToggle={() => editor.chain().focus().toggleTaskList().run()}
        >
          <Icon name="CheckIcon" className="size-4" />
        </ToggleButton>
      )}

      {isLinkBtn && (
        <ToggleButton isToggle={editor.isActive("link")} onPress={setUnsetLink}>
          <Icon name="LinkIcon" className="size-4" />
        </ToggleButton>
      )}

      {isImageBtn && (
        <ToggleButton isToggle={false} onPress={addImage}>
          <Icon name="ImagePlus" className="size-4" />
        </ToggleButton>
      )}

      <ToggleButton
        isToggle={editor.isActive("undo")}
        onToggle={() => editor.chain().focus().undo().run()}
      >
        <Icon name="Undo" className="size-4" />
      </ToggleButton>
      <ToggleButton
        isToggle={editor.isActive("redo")}
        onToggle={() => editor.chain().focus().redo().run()}
      >
        <Icon name="Redo" className="size-4" />
      </ToggleButton>
    </div>
  );
};

const RichTextEditor = ({
  value,
  onChange,
  isEdit = true,
  isHightLightExtension,
  isLinkExtension,
  isTaskListExtension,
  isImageExtension,
  isMentionSuggestion,
  userMentionList = [],
}: RichTextEditorProps) => {
  const extensions: Extensions = [
    StarterKit.configure({
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: "border-l-[3px] border-gray-300 my-6 pl-4",
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class:
            "inline-block bg-slate-100 rounded-md text-black text-sm px-3 py-1",
        },
      },
    }),
  ];

  if (isLinkExtension) {
    extensions.push(
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          class:
            "transition ease-in-out delay-15 text-blue-500 cursor-pointer underline hover:text-blue-700",
        },
      })
    );
  }

  if (isHightLightExtension) {
    extensions.push(
      Highlight.configure({
        multicolor: true,
      })
    );
  }

  if (isTaskListExtension) {
    extensions.push(
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex",
        },
      })
    );
  }

  if (isImageExtension) {
    extensions.push(
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "block h-auto my-6 max-w-full bg-blue",
        },
      })
    );
  }

  if (isMentionSuggestion) {
    const mentionSuggestion: any = MentionSuggestion(userMentionList);

    extensions.push(
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: mentionSuggestion,
      })
    );
  }

  const editor = useEditor({
    editable: isEdit,
    editorProps: {
      attributes: {
        class:
          "min-h-32 w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
    },
    extensions,
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? (
        <RichTextEditorToolbar
          editor={editor}
          isHightLightBtn={isHightLightExtension}
          isLinkBtn={isLinkExtension}
          isMention={isMentionSuggestion}
          isTaskListBtn={isTaskListExtension}
          isImageBtn={isImageExtension}
        />
      ) : null}
    </>
  );
};

export default RichTextEditor;
