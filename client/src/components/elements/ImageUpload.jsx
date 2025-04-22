// import React from "react";
// import ImageUploading from "react-image-uploading";
// import AddImage from "../../assets/images/portfolio/add-image.png";
// import { FiEdit, FiDelete } from "react-icons/fi";
// import { TextField, makeStyles, Box } from "@mui/material";
// import { GroupContext } from "../application/group/GroupList";

// // export default function ImageUpload(props)

// export function ImageUpload(props) {
//   const [images, setImages] = React.useState([]);
//   const maxNumber = 69;

//   const context = React.useContext(GroupContext);

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex);
//     setImages(imageList);
//   };

//   return (
//     <Box component="div" className="App">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <Box
//             component="div"
//             className="upload__image-wrapper"
//             display="flex"
//             width="100%"
//           >
//             <Box
//               component="div"
//               flex="1"
//               style={isDragging ? { color: "red" } : undefined}
//               onClick={onImageUpload}
//               {...dragProps}
//               className="group-image-add-span"
//             >
//               <img alt="this-img" src={AddImage} />
//             </Box>
//             <Box component="div" className="custom-input" flex="4">
//               <TextField
//                 id="outlined-basic"
//                 label="Enter Group Name"
//                 variant="outlined"
//                 type="text"
//                 style={{
//                   width: "100%",
//                 }}
//                 onChange={context.handleChange}
//               ></TextField>
//             </Box>
//             &nbsp;
//             {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
//             {imageList.map((image, index) => (
//               <Box component="div" key={index} className="image-item">
//                 <img src={image["data_url"]} alt="" width="100" />
//                 <Box component="div" className="image-item__btn-wrapper">
//                   <span
//                     onClick={() => onImageUpdate(index)}
//                     className="group-edit"
//                   >
//                     <FiEdit />
//                   </span>
//                   <span
//                     onClick={() => onImageRemove(index)}
//                     className="group-del"
//                   >
//                     <FiDelete />
//                   </span>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         )}
//       </ImageUploading>
//     </Box>
//   );
// }
