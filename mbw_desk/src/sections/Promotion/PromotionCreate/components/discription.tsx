/** @format */

import React, { memo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  List,
  Paragraph,
  SelectAll,
  TextTransformation,
  Underline,
  Undo,
  EventInfo,
} from "ckeditor5";
import { SlashCommand } from "ckeditor5-premium-features";
import { useDispatch } from "react-redux";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import styled from "styled-components";
import useDebounce from "@/hooks/useDebount";

const DivCustom = styled.div`
  & .ck.ck-content.ck-editor__editable {
    min-height: 300px;
  }
`;

const editorConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "insertImage",
      "|",
      "alignment",
      "|",
      "bulletedList",
      "numberedList",
    ],
    shouldNotGroupWhenFull: false,
  },
  plugins: [
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    Autosave,
    Base64UploadAdapter,
    Bold,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Italic,
    List,
    Paragraph,
    SelectAll,
    TextTransformation,
    Underline,
    Undo,
  ],
  fontFamily: {
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 22],
    supportAllValues: true,
  },
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true,
      },
    ],
  },
  image: {
    toolbar: [
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "imageStyle:inline",
      "imageStyle:wrapText",
      "imageStyle:breakText",
      "|",
      "resizeImage",
    ],
  },
  placeholder: "Description",
};

function Discription({
  setPromotionDiscription,
  value,
}: {
  setPromotionDiscription: (value: String) => void;
  value: String | undefined;
}) {
  const editorToolbarRef = React.useRef(null);
  const [content, setContent] = React.useState<string>("");
  const [hasDiv, setDiv] = React.useState<boolean>(false);
  useEffect(() => {
    setDiv(true);
    return () => setDiv(false);
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    value && setContent(value);
  }, [value]);

  const handleDiscription = (
    event: EventInfo<string, unknown>,
    editor: ClassicEditor
  ) => {
    const data = editor.getData(); // Lấy dữ liệu từ CKEditor
    setContent(data); // Cập nhật state với dữ liệu mới
  };

  const debounceText = useDebounce(content);
  useEffect(() => {
    dispatch(setPromotionDiscription(debounceText));
  }, [debounceText]);

  return (
    <div className="h-fit">
      <h4 className="text-sm font-normal mt-4 xl:mt-0 mb-3">
        Nội dung khuyến mãi
      </h4>

      <div ref={editorToolbarRef}></div>
      {hasDiv && (
        <DivCustom>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => handleDiscription(event, editor)}
            config={editorConfig}
            onReady={(editor) => {
              if (editorToolbarRef.current) {
                editorToolbarRef.current.appendChild(
                  editor.ui.view.toolbar.element
                );
              }
            }}
            onAfterDestroy={(editor) => {
              if (editorToolbarRef.current) {
                Array.from(editorToolbarRef.current.children).forEach((child) =>
                  child.remove()
                );
              }
            }}
          />
        </DivCustom>
      )}
    </div>
  );
}

export default memo(Discription);
