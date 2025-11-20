import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export const ImagePlaceholder = ({
    text,
    height = "h-64",
    className = "",
}: {
    text: string;
    height?: string;
    className?: string;
}) => (
    <div
        className={`relative w-full ${height} group flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-200 text-slate-400 ${className}`}
    >
        <div className="absolute inset-0 bg-slate-300/20 transition-colors group-hover:bg-slate-300/40" />
        <ImageIcon className="mb-2 h-10 w-10 opacity-50" />
        <span className="font-mono text-sm font-medium">{text}</span>
        <span className="mt-1 text-xs opacity-60">Replace with Image</span>
    </div>
);

type Props = {
    src: string;
    alt: string;
    height?: string;
    className?: string;
};

export default function ImageDisplay({ src, alt, height, className }: Props) {
    if (!src) {
        return (
            <ImagePlaceholder
                text={alt}
                height={height}
                className={className}
            />
        );
    }

    return (
        <div className="relative h-64 w-full overflow-hidden rounded-tr-[3rem]">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
    );
}
