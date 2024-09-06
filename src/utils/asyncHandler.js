const asyncHandler = () => {
  async (req, res, next) => {
      await Promise.resolve(requestHandler(req, res, next)); 
  };
};

export { asyncHandler };

// const asyncHandler = ()=>{}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}    //higher order function

// const asyncHandler = (fn) => async(req, res, next) => {   
//   try {
//     await(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message 
//     })
//   }
// }