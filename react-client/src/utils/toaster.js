// // toaster.ts
// // import { Intent, Position, Toaster } from "@blueprintjs/core";
// import { underscoresToSpaces } from './strings';

// const MyToaster = Toaster.create({})

// const parse = (type, err, message) => {
//   let errorMessage = ''
//   // console.log(err)
//   switch (err.code) {
//     case 0:
//       if (err.message.includes('reduce storage capacity')) {
//         errorMessage = `Invalid action! You ${err.message.toLowerCase()} Please make sure you entered the right amount.`
//       } else {
//         errorMessage = err.message
//       }
//       break
//     case 1:
//       if (err.error.type.includes('netid')) {
//         errorMessage = `I'm sorry! This user does not exist. If you logged in previously using NetID, you will need to login by clicking the "Login Using NetID" button.`
//       } else {
//         errorMessage = `I'm sorry! You do not have authorization to view this page. Check with an admin to request for permission.`
//       }
//       break
//     case 2:
//       errorMessage = `Sorry, that password isn’t right. Please make sure you've keyed in the right one.`
//       break
//     case 3:
//       errorMessage = `This user account does not exist. Enter a different account or approach an admin to create one.`
//       break
//     case 4:
//       errorMessage = `You've made an invalid request. We cannot process this request as it is lacking valid input or you are missing valid conditions.`
//       break
//     case 5:
//       let item = 'item', field = 'field'
//       if (err.error.errmsg && err.error.errmsg.includes('ingredients')) {
//         item = 'ingredient'
//         field = 'name'
//       } else if (err.error.errmsg && err.error.errmsg.includes('vendors')) {
//         item = 'vendor'
//         if(err.error.errmsg.includes('name')) {
//           field = 'name'
//         } else if(err.error.errmsg.includes('freight')) {
//           field = 'freight carrier code'
//         }
//       } else if (err.error.message && err.error.message.includes('formulas')) {
//         item = 'formula'
//         field = 'name'
//       }
//       errorMessage = `Another ${item} with this ${field} already exists`
//       break
//     case 6:
//       // console.log('violating order constraint')
//       errorMessage = message
//       break
//     case 7:
//       // console.log('no vendor selling this ingredient')
//       errorMessage = message
//       break
//     case 8:
//       // console.log('customized error message')
//       errorMessage = message
//       break
//     default:
//       errorMessage = message
//   }
//   return errorMessage
// }

// export const showToast = (type, message, err) => {
//   let intent
//   let iconName
//   let errorMessage
//   // console.log(err)
//   if(type === "info") {
//     iconName = "info-sign"
//   }
//   if(type === "error") {
//     if(!err) {
//       errorMessage = message
//     } else {
//       errorMessage = parse(type, err, message)
//     }
//     intent = Intent.DANGER
//     iconName = "warning-sign"
//   } else if(type === "warning") {
//     // parse(type, message, err)
//     intent = Intent.WARNING
//     iconName = "warning-sign"
//     errorMessage = message
//   } else if(type === "success") {
//     intent = Intent.SUCCESS
//     iconName = "tick-circle"
//     errorMessage = message
//   }
//   MyToaster.show(
//     {
//       intent: intent,
//       position: Position.TOP,
//       iconName: iconName,
//       message: underscoresToSpaces(errorMessage)
//     }
//   )
// }
