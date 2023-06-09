const router = require('express').Router()

//import under-routers
const categoryRouter = require('./CategoryRouter')
const typeRouter = require('./TypeRouter')
const variantRouter = require('./VariantRouter')
const brandRouter = require('./BrandRouter')
const itemRouter = require('./ItemRouter')
const sizeRouter = require('./SizeRouter')
const CDEKRouter = require('./CDEKRouter')
const orderRouter = require('./OrderRouter')
const budgetRouter = require('./BudgetRouter')
const expensesRouter = require('./ExpensesRouter')
const userRouter = require('./UserRouter')

//under-routers
router.use('/category', categoryRouter)
router.use('/type', typeRouter)
router.use('/variant', variantRouter)
router.use('/brand', brandRouter)
router.use('/size', sizeRouter)
router.use('/item', itemRouter)
router.use('/cdek', CDEKRouter)
router.use('/order', orderRouter)
router.use('/budget', budgetRouter)
router.use('/expenses', expensesRouter)
router.use('/user', userRouter)

module.exports = router