import { ReactNode } from "react";

import { Breadcrumbs, BreadcrumbsItem } from "@/components/daisyui";

type PageTitleProps = {
    title: string;
    subMenu: string;
    center?: ReactNode;
};

const PageTitle = ({ title, subMenu, center }: PageTitleProps) => {
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {center != null && center}
            <Breadcrumbs className="hidden p-0 sm:inline">
                <BreadcrumbsItem href="/" className="text-base-content/60">
                    Home
                </BreadcrumbsItem>
                <BreadcrumbsItem className="text-base-content/60">{subMenu}</BreadcrumbsItem>
                <BreadcrumbsItem>{title}</BreadcrumbsItem>
            </Breadcrumbs>
        </div>
    );
};

export default PageTitle;
