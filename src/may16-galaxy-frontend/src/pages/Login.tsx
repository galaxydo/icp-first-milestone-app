import logInIcon from "@iconify/icons-lucide/log-in";

import { Button, Checkbox } from "@/components/daisyui";

import authImage from "@/images/auth-hero.png";
import avatar1Image from "@/images/avatar.png";

import starIcon from "@iconify/icons-lucide/star";

import { Alert, Card, CardBody, Mask, Toast } from "@/components/daisyui";

import Icon from "@/components/Icon";

const LoginPage = () => {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="relative hidden bg-[#FFE9D1] dark:bg-[#14181c] lg:col-span-7 lg:block xl:col-span-8 2xl:col-span-9">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={authImage} className="object-cover" alt="Auth Image" />
        </div>
        <div className="animate-bounce-2 absolute bottom-[15%] right-[20%]">
          <Card className="w-64 bg-base-100/80  backdrop-blur-lg">
            <CardBody className="p-6">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={avatar1Image}
                  className={`size-11 bg-base-content/10 p-0.5 ${Mask.className({ variant: "squircle" })}`}
                  alt=""
                />
                <div className="mt-2 flex items-center justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon
                      icon={starIcon}
                      key={index}
                      className="size-3 text-orange-400 svg-path:fill-orange-400"
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium">Happy Customer</p>
              </div>
              <p className="text-sm text-base-content/90">
                When I can see all of my notes and workflows organized in inter-connected manner it brings me a lot of clarity and insights. 
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="col-span-12  lg:col-span-5 xl:col-span-4 2xl:col-span-3">
        <div className="flex flex-col items-stretch p-8 lg:p-16">
          <div className="flex items-center justify-between">
            <h1 class="text-bold text-xl">Galaxy</h1>
          </div>
          <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Login</h3>
          <h3 className="mt-2 text-center text-sm text-base-content/70">
            Web-based Personal Knowledge Management System on Internet Computer
          </h3>
          <div className="mt-10">
            <div>
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
                                call loginWithInternetIdentity()
                                                            '
                color="primary"
                loading={false}
                className="gap-3 text-base"
                fullWidth
                startIcon={<Icon icon={logInIcon} fontSize={16} />}>
                Login with Internet Identity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
