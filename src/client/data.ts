import type { CardData } from "client/types"

export const cardsData:CardData[] = [
    {
        title: "Fast development",
        desc: "Powered by svelteKit which uses vite, a super fast development tool with super fast Hot Modules Replacement (HMR).",
        href: "https://kit.svelte.dev/",
        emoji: "⚡️",
        linkAttrs: { target:"_blank", rel:"noreferrer"}
    },
    {
        title: "Fully Typed ",
        desc: "Writing in svelte TypeScript with full types for all APIS end-points and auto generate routes types.",
        href: "https://kit.svelte.dev/",
        emoji: "🔑",
        linkAttrs: {}
    },
    {
        title: "Assets handler",
        desc: "No need to user Third party apps to handle your assets (videos,audio soon), svelteCMS handle delivery and upload.",
        href: "https://kit.svelte.dev/",
        emoji: "🏞️",
        linkAttrs: { target:"_blank", rel:"noreferrer"}
    },
]

export const socialMedias = {
    twitter:{
        src:"https://twitter.com/svelteCMS",
        alt:"svelteCMS"
    },
    github:{
        src:"https://github.com/sveltecms",
        alt:"svelteCMS"
    }
}