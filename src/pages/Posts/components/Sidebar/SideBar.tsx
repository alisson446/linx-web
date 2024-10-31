import { Aside, AsideTop } from "./styled";

import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { ISidebar } from "../../../../models/sidebar.model";

const SideBar = ({ status }: ISidebar) => {
  const friends = [
    {
      id: 1,
      name: "João",
      online: true,
    },
    {
      id: 2,
      name: "Maria",
      online: true,
    },
    {
      id: 3,
      name: "José",
      online: false,
    },
  ];

  return (
    <>
      <AsideTop className="contentTop">
        <h2>{status.title}</h2>
      </AsideTop>

      <Aside className="contentMain">
        <TableContainer marginBottom="10px">
          <Table>
            <Thead padding="0 30px 0 30px">
              <Td fontWeight="600" minWidth={200}>Amigos</Td>
              <Td fontWeight="600" fontSize="0.9rem">Online</Td>
            </Thead>

            <Tbody>
              {friends.map((friend) => (
                <Tr key={friend.id}>
                  <Td fontSize="0.9rem">
                    {friend.name}
                  </Td>
                  <Td fontSize="0.9rem">
                    <div style={{
                      backgroundColor: friend.online ? 'green' : 'gray',
                      borderRadius: "50%",
                      width: "10px",
                      height: "10px"
                    }} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Aside>
    </>
  );
};

export default SideBar;
