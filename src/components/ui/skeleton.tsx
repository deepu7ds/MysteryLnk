import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-primary/10 w-[90vw] lg:w-[70vw]",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
