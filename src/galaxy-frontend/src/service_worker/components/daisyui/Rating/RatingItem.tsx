import { InputHTMLAttributes, ReactElement } from "react";

export type RatingItemProps = InputHTMLAttributes<HTMLInputElement>;

const RatingItem = ({ ...props }: RatingItemProps): ReactElement => {
    return <input {...props} type="checkbox" />;
};

export default RatingItem;
