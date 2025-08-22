import React from "react";

export function Button({ className = "", children, ...props }) {
    return (
        <button className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-black text-white hover:opacity-90 ${className}`} {...props}>
            {children}
        </button>
    );
}
