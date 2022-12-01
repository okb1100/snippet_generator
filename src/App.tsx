import { useMemo, useState } from "react";
import "./App.css";
import TextBox from "./components/TextBox";

const escape = (string: string) => string.replaceAll('"', '\\"');

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const parseBody = (code: string) => {
    const reducer = (prev: string, curr: string) =>
      `${prev}\n\t"${escape(curr)}",`;
    return code.split("\n").reduce(reducer, "");
  };

  const snippet = useMemo(() => {
    return `
    "${escape(name)}": {
      "prefix": "${escape(keyword)}",
      "body": [
        ${parseBody(content)}
      ],
      "description": "${escape(description)}"
    }
    `;
  }, [content, parseBody]);

  return (
    <>
      <div className="header">
        <p>vscode snippet generator</p>
        Use <span className="shortcut">⌘+E</span> to insert a variable
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
          <TextBox main disabled content={snippet} />
        </div>
      </main>
      <div className="footer">
        inspired by <a href="https://snippet-generator.app/">snippet generator</a> by Pawel Grzybek
      </div>
    </>
  );
}
