import { Injectable } from "@angular/core";
import { Selector, State } from "@ngxs/store";

export class AppStateModel {
    user: any; 
}

@State<AppStateModel>({
    name: "app",
    defaults: {
        user: null,
    }
})
@Injectable()
export class AppState {

    @Selector()
    static getUser(state: AppStateModel) {
        return state.user;
    }
}