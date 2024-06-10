import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import eyeIcon from "@iconify/icons-lucide/eye";
import eyeOffIcon from "@iconify/icons-lucide/eye-off";
import keyRoundIcon from "@iconify/icons-lucide/key-round";
import logInIcon from "@iconify/icons-lucide/log-in";
import mailIcon from "@iconify/icons-lucide/mail";

import { Link } from "react-router-dom";

import { Button, Checkbox } from "@/components/daisyui";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
// import PageMetaData from "@/components/PageMetaData";
import FormInput from "@/components/forms/FormInput";
import routes from "@/services/routes";

import ThemeToggle from "../components/ThemeToggle";
import useLogin from "./use-login";

const LoginPage = () => {
    const { isLoading, control, onSubmit, showPassword, toggleShowPassword } = {}; // useLogin();

    return (
        <>
            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Logo />
                    <ThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Login</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
                </h3>
                <div className="mt-10">
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <label className="label">
                                <span className="label-text"></span>
                                <p
                                    className="label-text text-xs text-base-content/80"
                                    to={routes.auth.forgotPassword}>
                                    Forgot Password?
                                </p>
                            </label>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <Checkbox name="agreement" id="agreement" size="xs" color="primary" />
                            <label htmlFor="agreement">
                                I agree with{" "}
                                <span className="cursor-pointer text-primary underline">terms and conditions</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button
                            _='on click
                                call authenticate()
                                                            '
                            color="primary"
                            loading={false}
                            onClick={onSubmit}
                            className="gap-3 text-base"
                            fullWidth
                            startIcon={<Icon icon={logInIcon} fontSize={16} />}>
                            Login
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Button
                            size={"md"}
                            fullWidth
                            className="flex items-center gap-3 border-base-content/10  !text-base-content hover:border-transparent hover:bg-base-content/10"
                            variant={"outline"}>
                            <img src={googleMiniImage} className="size-6" alt="" />
                            <span className="text-base">Login with Google</span>
                        </Button>
                    </div>
                    <p className="mt-6 text-center text-sm text-base-content/80">
                        Haven&apos;t account{" "}
                        <p>
                            Create One
                        </p>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
