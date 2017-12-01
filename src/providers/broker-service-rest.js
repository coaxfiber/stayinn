var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { SERVER_URL } from './config';
import { Http } from '@angular/http';
var brokersURL = SERVER_URL + 'brokers/';
var BrokerService = (function () {
    function BrokerService(http) {
        this.http = http;
    }
    BrokerService.prototype.findAll = function () {
        alert("findall");
        return this.http.get(brokersURL)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    BrokerService.prototype.findById = function (id) {
        return this.http.get(brokersURL + id)
            .map(function (res) { return res.json(); })
            .toPromise();
    };
    return BrokerService;
}());
BrokerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], BrokerService);
export { BrokerService };
//# sourceMappingURL=broker-service-rest.js.map