import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemText,
//   ListItemIcon,
//   ListItemButton,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import SummarizeIcon from "@mui/icons-material/Summarize";

// const Sidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           backgroundColor: "#17181b",
//           color: "#fff",
//           boxSizing: "border-box",
//         },
//         "& .MuiListItemIcon-root": {
//           color: "#fff",
//           opacity: 0.5,
//         },
//       }}
//     >
//       <List sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
//         <ListItemButton
//           component={Link}
//           to="React-Sidebar-example/"
//           sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{
//               style: {
//                 color: (theme) => theme.palette.primary.main,
//                 opacity: 0.5,
//               },
//             }}
//             primary="HOME"
//           />
//         </ListItemButton>
//         <ListItemButton
//           component={Link}
//           to="React-Sidebar-example/cats"
//           sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
//         >
//           <ListItemIcon>
//             <PersonIcon />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{
//               style: {
//                 color: (theme) => theme.palette.primary.main,
//                 opacity: 0.5,
//               },
//             }}
//             primary="CATS"
//           />
//         </ListItemButton>
//         <ListItemButton
//           component={Link}
//           to="React-Sidebar-example/dogs"
//           sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
//         >
//           <ListItemIcon>
//             <SummarizeIcon />
//           </ListItemIcon>
//           <ListItemText
//             primaryTypographyProps={{
//               style: {
//                 color: (theme) => theme.palette.primary.main,
//                 opacity: 0.5,
//               },
//             }}
//             primary="DOGS"
//           />
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;



// import React from "react";
// import "./../styles/index.css"
// class ErrorPage extends React.Component {
//   render() {
//     return (
//       <div className="page-heading">
//         <h1 className="title">404 Request not allowed!!</h1>
//       </div>
//     );
//   }
// }

// export default ErrorPage;