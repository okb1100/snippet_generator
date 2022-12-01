import React from 'react'

type TextBoxProps = {
    content: string;
    onChange?: (content: string) => void,
    placeholder?: string;
    main?: boolean;
    disabled?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({content, onChange, main = false,placeholder = "", disabled = false}) => {
  return (
    <>
      <textarea disabled={disabled} className={`${main ? "main" : ""}`} placeholder={placeholder} value={content} onChange={e => onChange && onChange(e.target.value)}>
      </textarea>
    </>
  )
}

export default TextBox
