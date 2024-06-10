import avatar3 from "@/assets/images/avatars/3.png";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { IAuthUser } from "@/types/auth";

export default function configureFakeBackend() {
    const users: IAuthUser[] = [
        {
            id: 1,
            email: "admin@daisyui.com",
            username: "daisyui",
            password: "password",
            firstName: "Daisy",
            lastName: "Admin",
            avatar: avatar3,
        },
    ];

    const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

    mock.onPost("/api/auth/login/").reply(function (config) {
        return new Promise(function (resolve, _) {
            setTimeout(function () {
                const params = JSON.parse(config.data);
                const filteredUser = users.find((user) => {
                    return user.email === params.email;
                });
                if (!filteredUser) {
                    resolve([422, { email: "This user isn't registered yet" }]);
                } else if (filteredUser.password !== params.password) {
                    resolve([422, { password: "Password is not correct" }]);
                }
                resolve([200, filteredUser]);
            }, 1000);
        });
    });

    mock.onPost("/api/any/success/").reply(function (_config) {
        return new Promise(function (resolve, _reject) {
            setTimeout(function () {
                resolve([200, { message: "Reset password link sent to email" }]);
            }, 1000);
        });
    });
}
