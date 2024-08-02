import { combineReducers } from "redux";
import {memberReducer , getBranchReducer} from "./MemberModule";
import askReducer from "./AskModule";
import {humanReducer , humanBranchReducer} from "./HRModule";

import { carDriverReducer, carReducer } from "./CarModule"; 
// import carInfoReducer from "./CarModule";

import { branchReducer } from "./BranchModule";

// 도아 - 보고서 
import { 
    branchSalesReducer , detailBranchSalesReducer, newBranchSalesReducer
    , vehicleRepairReducer, detailVehicleRepairReducer
    , expenseReducer, detailExpenseReducer, newExpenseReducer
    , findAllRepairReducer,detailRepairReducer
    , carMembersReducer
} from "./ReportsModule";

import  {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer, branchStockHistoryReducer}  from "./StockModule";

import {waterLevelReducer} from "./LandlyModule";



const rootReducer = combineReducers({
    memberReducer,
    getBranchReducer,
    askReducer,

    humanReducer,
    humanBranchReducer,

    carReducer,
    carDriverReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    newBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    newExpenseReducer,
    detailVehicleRepairReducer,
    findAllRepairReducer,
    detailRepairReducer,
    carMembersReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer,
    branchStockHistoryReducer,

    branchReducer,


    waterLevelReducer
})



export default rootReducer;

