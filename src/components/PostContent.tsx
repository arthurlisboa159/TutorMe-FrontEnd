import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";

let Output = dynamic(() => import("editorjs-react-renderer"), { ssr: false });

interface PostContentProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "black",
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  table: CustomTableRenderer,
};

const PostContent: FC<PostContentProps> = ({ content }) => {
  const parsedContent = JSON.parse(content);
  return (
    <Output
      data={parsedContent}
      style={style}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-100 rounded-md p-4">
      <code className="text-black text-sm">{data.code}</code>
    </pre>
  );
}

function CustomTableRenderer({ data }: any) {
  const { content } = data;

  const tableStyles = {
    border: "1px solid #ddd",
    width: "100%",
  };

  const cellStyles = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
  };

  const firstRowCellStyles = {
    ...cellStyles,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  };

  return (
    <div className="custom-table">
      <table style={tableStyles}>
        <tbody>
          {content.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: number) => (
                <td
                  key={cellIndex}
                  style={rowIndex === 0 ? firstRowCellStyles : cellStyles}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default PostContent;
