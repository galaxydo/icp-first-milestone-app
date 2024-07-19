import { ImgHTMLAttributes, forwardRef } from "react";

export type CardImageProps = ImgHTMLAttributes<HTMLImageElement>;

const CardImage = forwardRef<HTMLElement, CardImageProps>(({ ...props }, ref) => {
    return (
        <figure ref={ref}>
            <img {...props} />
        </figure>
    );
});

CardImage.displayName = "Card image";

export default CardImage;
