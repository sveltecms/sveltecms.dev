declare namespace App {
	interface Locals {
        sessionIdName: string
        userData:import("cms/types").UserData
        appData:import("cms/types").App
        authID:string
    }
	interface PageData {
        appData:import("cms/types").App
        userData:import("cms/types").UserData
        authID:string
    }
	// interface Error {}
	// interface Platform {}
}
