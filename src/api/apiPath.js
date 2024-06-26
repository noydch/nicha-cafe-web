const baseUrl = "https://niicha-server-esiv.onrender.com/api";
export default class ApiPath {

    // ----- auth -----
    static login = `${baseUrl}/user/login/`;
    static register = `${baseUrl}/user/register/`;
    static addProduct = `${baseUrl}/product/insert/`;

    // ----- user -----
    static getAllUsers = `${baseUrl}/user/getAll/`;
    static getOneUser = `${baseUrl}/user/getOne/`;
    static addUser = `${baseUrl}/user/insert/`;
    static updateUser = `${baseUrl}/user/update/`;
    static deleteUser = `${baseUrl}/user/delete/`;

    // ----- product_type -----
    static getAllProductTypes = `${baseUrl}/product_type/getAll/`;
    static getOneProductType = `${baseUrl}/product_type/getOne/`;
    static addProductType = `${baseUrl}/product_type/insert/`;
    static updateProductType = `${baseUrl}/product_type/update/`;
    static deleteProductType = `${baseUrl}/product_type/delete/`;

    // ----- product -----
    static getAllProducts = `${baseUrl}/product/getAll/`;
    static getOneProduct = `${baseUrl}/product/getOne/`;
    static addProduct = `${baseUrl}/product/insert/`;
    static updateProduct = `${baseUrl}/product/update/`;
    static deleteProduct = `${baseUrl}/product/delete/`;
    static searchProduct = `${baseUrl}/product/search`

    // ----- table -----
    static getAllTables = `${baseUrl}/tables/getAll/`;
    static getOneTable = `${baseUrl}/tables/getOne/:TID`;
    static addTable = `${baseUrl}/tables/insert/`;
    static updateTable = `${baseUrl}/tables/update/`;
    static deleteTable = `${baseUrl}/tables/delete/`;

    // ----- orders -----
    static getAllOrders = `${baseUrl}/order/getAll/`;
    static getOneOrder = `${baseUrl}/order/getOne/`;
    static addOrder = `${baseUrl}/order/insert/`;
    static addOrderTableNo = `${baseUrl}/order/insertNoTable`
    static updateOrder = `${baseUrl}/order/update/`;
    static deleteOrder = `${baseUrl}/order/delete/`;

    // ----- order detail -----
    static getAllOrderDetails = `${baseUrl}/orderDetail/getAll/`;
    static getOneOrderDetail = `${baseUrl}/orderDetail/getOne/`;
    static addOrderDetail = `${baseUrl}/orderDetail/insert/`;
    static deleteOrderDetail = `${baseUrl}/orderDetail/delete/`;

    // ----- employee -----
    static getAllEmployee = `${baseUrl}/employee/getAll/`;
    static getOneEmployee = `${baseUrl}/employee/getOne/`;
    static addEmployee = `${baseUrl}/employee/insert/`;
    static updateEmployee = `${baseUrl}/employee/update/`;
    static deleteEmployee = `${baseUrl}/employee/delete/`;



}