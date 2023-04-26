/** Returned data from EditorJs */
export interface EditorJsData{
    time: number
    blocks:EditorJsDataBlocks[]
    version: string;
}

/** Blocks|List in EditorJs */
export type EditorJsDataBlocks = EditorJsParagraphData|EditorJsHeaderData|EditorJsCodeData|EditorJsListData|EditorJsImageData

/** Paragraph block data */
export interface EditorJsParagraphData {
    id: string
    type: "paragraph"
    data: { text:string }
}

/** Header block data */
export interface EditorJsHeaderData { // Level is the header type h1,h2,h3 and more
    id: string
    type: "header"
    data: { text:string, level:number }
}

/** Code block data */
export interface EditorJsCodeData {
    id: string
    type: "code"
    data: { code:string }
}

/** List block data */
export interface EditorJsListData {
    id: string
    type: "list"
    data: {
        style: "unordered" | "ordered"
        items:  string[];
    }
}

/** List block data */
export interface EditorJsImageData {
    id: string
    type: "image"
    data: {
        url:string
        caption:string
        withBorder:boolean
        withBackground:boolean
        stretched:boolean
    }
}