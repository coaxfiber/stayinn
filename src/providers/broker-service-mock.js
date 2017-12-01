var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import brokers from './mock-brokers';
var BrokerService = (function () {
    function BrokerService() {
    }
    BrokerService.prototype.findAll = function () {
        return Promise.resolve(brokers);
    };
    BrokerService.prototype.findById = function (id) {
        return Promise.resolve(brokers[id - 1]);
    };
    return BrokerService;
}());
BrokerService = __decorate([
    Injectable()
], BrokerService);
export { BrokerService };
//# sourceMappingURL=broker-service-mock.js.map