import { OptionHTMLAttributes, ReactElement } from "react";

export type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement>;

const SelectOption = ({ children, ...props }: SelectOptionProps): ReactElement => {
    return <option {...props}>{children}</option>;
};

export default SelectOption;
