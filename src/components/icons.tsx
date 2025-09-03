import type { SVGProps } from "react";

export function KaabaIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M4 4h16v16H4z" />
            <path d="M18 4l-6 6-6-6" />
            <path d="M6 20l6-6 6 6" />
            <path d="M4 12h16" />
        </svg>
    )
}
