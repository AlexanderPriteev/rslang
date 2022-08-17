/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthType } from '../types/index';

class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    public get authUser(): AuthType {
        return this.authUser;
    }

    public set authUser(value: AuthType) {
        this.authUser = value;
    }
}

export const store = Singleton.getInstance();
