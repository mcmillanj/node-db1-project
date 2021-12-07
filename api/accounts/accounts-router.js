const express = require('express')
const Account = require('./accounts-model')
const router = express.Router()

  const {
  checkAccountPayload,
    checkAccountId,
    checkAccountNameUnique,
} = require('./accounts-middleware')



router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{

  const accounts = await Account.getAll()
  res.json(accounts)

} catch (err) {
next(err)
}
})



router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
      res.json(account)
  } catch (err) {
    next(err)
  }
  })




router.post('/', checkAccountPayload,
  checkAccountNameUnique, 
    async (req, res, next) => {
      try {
        const newAccount = await Account.create(req.body)
        res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})




router.put('/:id',checkAccountPayload, checkAccountId,checkAccountNameUnique, 
    async (req, res, next) => {
      try {
        const updatedAccount = await Account.updateById(req.params.id, req.body)
        res.json(updatedAccount)
  } catch (err) {
        next(err)
  }
  })


router.delete('/:id',  checkAccountId, 
async (req, res, next) => {
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }

})

router.use((err, req, res, next) => { 
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: 'somethings wrong',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
