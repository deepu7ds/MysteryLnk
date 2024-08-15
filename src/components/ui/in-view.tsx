"use client";
import { ReactNode, useRef } from "react";
import {
    motion,
    useInView,
    Variant,
    Transition,
    UseInViewOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface InViewProps {
    children: ReactNode;
    className?: string;
    variants?: {
        hidden: Variant;
        visible: Variant;
    };
    transition?: Transition;
    viewOptions?: UseInViewOptions;
}

const defaultVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export function InView({
    children,
    className,
    variants = defaultVariants,
    transition,
    viewOptions,
}: InViewProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewOptions);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
