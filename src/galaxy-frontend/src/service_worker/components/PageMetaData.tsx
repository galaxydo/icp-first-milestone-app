import { Helmet } from "react-helmet-async";

type PageMetaDataProps = {
    title: string;
};

const PageMetaData = ({ title }: PageMetaDataProps) => {
    return (
        <Helmet>
            <title> {title} | Nexus, Client & Admin React Dashboard</title>
        </Helmet>
    );
};

export default PageMetaData;
