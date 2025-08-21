import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className = "", children, ...props }) {
    return (
        <DialogPrimitive.Content className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow ${className}`} {...props}>
            {children}
        </DialogPrimitive.Content>
    );
}

export function DialogHeader({ className = "", children, ...props }) {
    return (
        <div className={`mb-4 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function DialogTitle({ className = "", children, ...props }) {
    return (
        <DialogPrimitive.Title className={`text-lg font-semibold leading-none ${className}`} {...props}>
            {children}
        </DialogPrimitive.Title>
    );
}

export function DialogDescription({ className = "", children, ...props }) {
    return (
        <DialogPrimitive.Description className={`text-sm text-gray-600 ${className}`} {...props}>
            {children}
        </DialogPrimitive.Description>
    );
}

export function DialogFooter({ className = "", children, ...props }) {
    return (
        <div className={`mt-4 flex justify-end gap-2 ${className}`} {...props}>
            {children}
        </div>
    );
}



