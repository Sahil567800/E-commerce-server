import { CODController ,myOrdersController} from "../controllers/orderController.js";
import adminauth from '../middleware/adminAuth.js'
import  express from 'express'
const Router = express.Router();

Router.post('/COD',adminauth('user'),CODController)
Router.get('/myOrders',adminauth('user'),myOrdersController)

export default Router;