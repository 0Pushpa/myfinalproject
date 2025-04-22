// import { Link as RouterLink } from "react-router-dom";
// // material
// import { Box, Button, Typography, Container } from "@mui/material";
// // components
// import { MotionContainer, varBounceIn } from "../animate";

// import NotFound from "../../assets/illustrations/illustration_404.svg";

// // ----------------------------------------------------------------------

// // ----------------------------------------------------------------------

// export default function Page404() {
//   return (
//     <Container>
//       <MotionContainer
//         initial="initial"
//         open
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 480,
//             margin: "auto",
//           }}
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           {/* <motion.div variants={varBounceIn}>
//             <Typography variant="h3" paragraph>
//               Sorry, page not found!
//             </Typography>
//           </motion.div>
//           <Typography sx={{ color: "text.secondary" }}>
//             Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
//             mistyped the URL? Be sure to check your spelling.
//           </Typography> */}

//           <div variants={varBounceIn}>
//             <Box
//               component="img"
//               src={NotFound}
//               sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
//             />
//           </div>
//           <div
//             style={{
//               marginTop: "15px",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             {" "}
//             <Button
//               to="/"
//               size="large"
//               variant="contained"
//               component={RouterLink}
//               style={{ width: "150px", color: "#fff", background: "#00ab55" }}
//             >
//               Go to Home
//             </Button>
//           </div>
//         </Box>
//       </MotionContainer>
//     </Container>
//   );
// }

import React from "react";

const Page404 = () => {
  return <div>Page Not Found</div>;
};

export default Page404;
