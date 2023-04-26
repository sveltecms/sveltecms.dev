const config = {
    // Dark theme
    dark:{
        color:{
            bg:"#12181b",
            color:"#e0e0e0",
            codeKeyColor:"#b372a8",
            codeCommentColor:"#538b46",
            codeStringColor:"#B58672",
            codeFuncColor:"#dbdba6",
        }
    },
    // Light theme
    light:{
        color:{
            bg:"#fbfbfb",
            color:"#5f5f5f",
            codeKeyColor:"#b372a8",
            codeCommentColor:"#538b46",
            codeStringColor:"#B58672",
            codeFuncColor:"#b9b921",
        }
    },
}
export function theme(theme:"dark" | "light"){
    return `
    <style>
        .cmsEditor pre{
            background-color:${config[theme]['color']['bg']};
            color:${config[theme]['color']['color']};
        }
        pre code.hljs {
            display: block;
            overflow-x: auto;
            padding: 1em;
        }
        code.hljs {
            padding: 3px 5px
        }
        .hljs {
            color: #adbac7;
            background: #22272e
        }
        .hljs-doctag,
        .hljs-keyword,
        .hljs-meta .hljs-keyword,
        .hljs-template-tag,
        .hljs-template-variable,
        .hljs-type,
        .hljs-variable.language_ {
            color: ${config[theme]['color']['codeKeyColor']}
        }
        .hljs-title,
        .hljs-title.function_ {
            color: ${config[theme]['color']['codeFuncColor']}
        }
        .hljs-title.class_,
        .hljs-title.class_.inherited__ {
            color: #47cead
        }
        .hljs-attr,
        .hljs-attribute,
        .hljs-literal,
        .hljs-meta,
        .hljs-number,
        .hljs-operator,
        .hljs-selector-attr,
        .hljs-selector-class,
        .hljs-selector-id,
        .hljs-variable {
            color: #6cb6ff
        }
        .hljs-meta .hljs-string,
        .hljs-regexp,
        .hljs-string {
            color: ${config[theme]['color']['codeStringColor']}
        }
        .hljs-built_in,
        .hljs-symbol {
            color: ${config[theme]['color']['codeFuncColor']}
        }
        .hljs-built_in{
            color: #47cead
        }
        .hljs-code,
        .hljs-comment,
        .hljs-formula {
            color: ${config[theme]['color']['codeCommentColor']}
        }

        .hljs-name,
        .hljs-quote,
        .hljs-selector-pseudo,
        .hljs-selector-tag {
            color: #3382b1
        }

        .hljs-subst {
            color: #adbac7
        }

        .hljs-section {
            color: #316dca;
            font-weight: 700
        }

        .hljs-bullet {
            color: #eac55f
        }

        .hljs-emphasis {
            color: #adbac7;
            font-style: italic
        }

        .hljs-strong {
            color: #adbac7;
            font-weight: 700
        }

        .hljs-addition {
            color: #b4f1b4;
            background-color: #1b4721
        }

        .hljs-deletion {
            color: #ffd8d3;
            background-color: #78191b
        }
    </style>
    `
}