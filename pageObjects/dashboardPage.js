class dashboardPage{


    constructor(page){

        this.page = page;
        this.products = page.locator('.card-body h5 b');
        this.cartBtn = page.locator("[routerlink*='cart']");
    }

    async searchProduct (productName){
        
        const products = this.products;
        await products.first().waitFor();
        const titles =  products.allTextContents();
        console.log(titles);
        const size = await products.count();

        for(let i=0 ; i<size ; ++i ){
    
           let text = await products.nth(i).textContent();
           
           if(await products.nth(i).textContent() === productName){
                await this.page.locator('text= Add To Cart').nth(i).click();
                break;        
           }
    
        }
    }
    async navigateToCart (){
        
        await this.cartBtn.click();
            
    }
    




}
module.exports = {dashboardPage};