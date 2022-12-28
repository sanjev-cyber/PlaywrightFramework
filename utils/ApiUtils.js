const { test, expect, request } = require('@playwright/test');
class ApiUtils {

    /*
        API testing web testing 
        request is used to access the APIs in the page 
        Data got from Inspect --> Network --> login 
        LoginPage
    */

    constructor(apiContext,loginPayLoad){
    //  this.localVal   = val from the object , 
    //  Important parameters and generic parameters are passed in constructor
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }
    
    // Always use await when calling an async func
    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',// Api URL 
        {
            data : this.loginPayLoad, // LoginPage payload 

        })
        expect(loginResponse.ok()).toBeTruthy(); // Status Validation
        const loginResponseJson  = await loginResponse.json(); // get Json 
        const loginResponseToken = loginResponseJson.token; // Token val in the Json
        console.log(loginResponseToken);
        return loginResponseToken;
    }

    /* 
        Use to Create an Order
        Authorization, Content-Type are both headers 
    */
    async createOrder(OrderPayLoad){

        // An Object is created with loginResponseToken and OrderReponseOrderID and returned 
        let reponseObj = {};
        reponseObj.loginResponseToken = await this.getToken();

        
        const OrderReponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', // Api URL
        {
                data : OrderPayLoad,
                headers : {
                    'Authorization' :  reponseObj.loginResponseToken,
                    'Content-Type'  : 'application/json'
                }
                
        }
    
    )
    expect(OrderReponse.ok()).toBeTruthy(); // Status Validation
    const OrderReponseJson = await OrderReponse.json(); // get Json 
    const OrderReponseOrderID = OrderReponseJson.orders[0]; // get orderId from the json
    console.log(OrderReponseJson);
    console.log(OrderReponseOrderID);
    reponseObj.OrderReponseOrderID = OrderReponseOrderID;
    return reponseObj;
    
    }


}
module.exports = {ApiUtils};