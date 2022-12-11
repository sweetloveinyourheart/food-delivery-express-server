import { UserController } from "./controller/UserController"
import { CategoryController } from './controller/CategoryController'
import { ProductController } from './controller/ProductController'

export const Routes = [{
    method: "post",
    route: "/user/register",
    controller: UserController,
    action: "register"
},
{
    method: "post",
    route: "/user/login",
    controller: UserController,
    action: "login"
},
{
    method: 'post',
    route: "/category/new",
    controller: CategoryController,
    action: 'newCategory'
},

{
    method: 'get',
    route: "/category/getList",
    controller: CategoryController,
    action: 'getCategory'
},

{
    method: 'post',
    route: "/product/new",
    controller: ProductController,
    action: 'newProduct'
},
{
    method: 'get',
    route: "/product/getList",
    controller: ProductController,
    action: 'getProduct'
}
]