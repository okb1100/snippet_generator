import { useMemo, useState } from "react";
import "./App.css";
import TextBox from "./components/TextBox";

const escape = (string: string) => string.replaceAll('"', '\\"');

const DEFAULT_CONTENT = `
import React from 'react'

type \${1:COMPONENT_NAME}Props = {}

const \${1:COMPONENT_NAME}: React.FC<\${1:COMPONENT_NAME}Props> = (props) => {
  return (
    <>
      <div>\${1:COMPONENT_NAME}</div>
    </>
  )
}

export default \${1:COMPONENT_NAME}

`
export default function App() {
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const parseBody = (code: string) => {
    const reducer = (prev: string, curr: string) =>
      `${prev}\n\t\t"${escape(curr)}",`;
    return code.split("\n").reduce(reducer, "");
  };

  const snippet = useMemo(() => {
    return `
    "${escape(name)}": {
      "prefix": "${escape(keyword)}",
      "body": [${parseBody(content)}
      ],
      "description": "${escape(description)}"
    }
    `;
  }, [content, parseBody]);

  const handleCopyPressed = () => {
    const type = "text/plain";
    const blob = new Blob([snippet], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        alert("Copied to clipboard");
      },
      () => {
        alert("Clipboard permission error");
      }
    );
  };

  return (
    <>
      <div className="header">
        <p>vscode snippet generator</p>
        Use <span className="shortcut">⌘+E</span> to insert a{" "}
        <a
          target="_blank"
          href="https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables"
        >
          variable
        </a>
      </div>
      <main>
        <div className="section left">
          <TextBox
            placeholder="Keyword"
            content={keyword}
            onChange={setKeyword}
          />
          <TextBox placeholder="Name" content={name} onChange={setName} />
          <TextBox
            placeholder="Description"
            content={description}
            onChange={setDescription}
          />
          <TextBox
            main
            placeholder="Paste your code here..."
            content={content}
            onChange={setContent}
          />
        </div>
        <div className="section right">
          <button onClick={handleCopyPressed} className="copy">
            Copy
          </button>
          <TextBox main disabled content={snippet} />
        </div>
      </main>
      <div className="footer">
        <p>
          inspired by{" "}
          <a target="_blank" href="https://snippet-generator.app/">
            snippet generator
          </a>
        </p>
        <a target="_blank" href="https://simplstack.com">
          simplstack
        </a>
      </div>
    </>
  );
}
