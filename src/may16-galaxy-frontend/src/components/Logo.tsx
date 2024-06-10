import logoDark from "@/assets/images/logo/logo-dark.png";
import logoLight from "@/assets/images/logo/logo-light.png";

type ILogoProp = {
    size?: number;
};

const Logo = ({ size = 20 }: ILogoProp) => {
    return (
        <div className="inline">
            <img src={logoDark} alt="logo-dark" className="hidden dark:inline" style={{ height: size }} />
            <img src={logoLight} alt="logo-light" className="inline dark:hidden" style={{ height: size }} />
        </div>
    );
};

export default Logo;
