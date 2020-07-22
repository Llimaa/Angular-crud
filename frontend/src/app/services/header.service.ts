import { HeaderDataModel } from './../models/header-data.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
    private _headerData = new BehaviorSubject<HeaderDataModel>({
        title: 'Início',
        icon: 'home',
        routeUrl: ''
    });
    constructor() { }

    get headerData(): HeaderDataModel {
        return this._headerData.value;
    }

    set headerData(headerData: HeaderDataModel) {
        this._headerData.next(headerData);
    }
}