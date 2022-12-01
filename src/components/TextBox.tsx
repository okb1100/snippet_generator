import React, { useRef } from "react";

type TextBoxProps = {
  content: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  main?: boolean;
  disabled?: boolean;
};

const TextBox: React.FC<TextBoxProps> = ({
  content,
  onChange,
  main = false,
  placeholder = "",
  disabled = false,
}) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleKeydown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const insertVariable =
      (e.key === "e" || e.key === "E") && (e.metaKey || e.ctrlKey);
    if (insertVariable) {
      const VAR_PLACEHOLDER = "${1:VARIABLE}";
      const VAR_PLACEHOLDER_START = 4; // Length of "${1:"
      const VAR_PLACEHOLDER_END = 12; // Length of "${1:VARIABLE"

      const elem = textarea.current;
      elem?.focus();
      elem?.setRangeText(
        VAR_PLACEHOLDER,
        elem.selectionStart,
        elem.selectionEnd
      );
      elem?.setSelectionRange(
        elem.selectionStart + VAR_PLACEHOLDER_START,
        elem.selectionStart + VAR_PLACEHOLDER_END,
        "forward"
      );
      onChange && onChange(elem?.value || content);
    }
  };

  return (
    <>
      <textarea
        ref={textarea}
        disabled={disabled}
        className={`${main ? "main" : ""}`}
        placeholder={placeholder}
        value={content}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={main ? handleKeydown : undefined}
      ></textarea>
    </>
  );
};

export default TextBox;
