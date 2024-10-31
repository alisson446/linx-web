import { Button, Flex, TableContainer } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { TBody, TD, THead, TR, Table } from "../../../components/Table";

// Styled Components
import { Content, SectionTop } from "./styled";

// Hooks and utils
import SimpleModal from "../../../components/SimpleModal";
import ModalRecordPost from "../components/ModalRegisterPost";
import AlertNoDataFound from "../../../components/AlertNoDataFound";
import { MdEdit } from "react-icons/md";
import ButtonIcon from "../../../components/ButtonIcon";
import { FiTrash } from "react-icons/fi";
import AlertModal from "../../../components/AlertModal";
import ModalUpdatePost from "../components/ModalUpdatePost";
import usePost from "../../../hooks/usePost";
import { IPost } from "../../../models/post.model";

const PostsList = () => {

  const { getPosts, deletePost } = usePost();
  const [modalRecordPost, setModalRecordProduct] = useState(false);
  const [modalUpdatePost, setModalUpdatePost] = useState(false);
  const [modalRemovePost, setModalRemovePost] = useState(false);
  const [postData, setPostData] = useState<IPost | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const registerPerPage = 10;

  const { mutate: mutateToDeletePost } = deletePost();
  const [postId, setPostId] = useState('');

  const { data, count, isLoading } = getPosts({
    size: registerPerPage,
    page: currentPage
  });

  const onConfirmRemovePost = () => {
    mutateToDeletePost(postId || "");
    setModalRemovePost(false);
  };

  return (
    <>
      <SectionTop className="contentTop">
        <Button
          leftIcon={<IoIosAdd />}
          onClick={() => {
            setModalRecordProduct(true);
          }}
        >
          Criar Postagem
        </Button>
      </SectionTop>

      <Content className="contentMain">
        {isLoading && (
          <Flex h="100%" alignItems="center">
            <Loading />
          </Flex>
        )}

        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                <TableContainer marginBottom="10px">
                  <Table>
                    <THead padding="0 30px 0 30px">
                      <TD></TD>
                      <TD>Título</TD>
                      <TD>Descrição</TD>
                      <TD></TD>
                    </THead>

                    <TBody>
                      {data.map((item) => (
                        <TR key={item.id}>
                          <TD>
                            {item.title}
                          </TD>
                          <TD>
                            {(item.content.length > 10) ? item.content.substring(0, 10) + '...' : item.content}
                          </TD>
                          <TD gap={3}>

                            <ButtonIcon tooltip="Editar">
                              <MdEdit
                                size={20}
                                // color={customTheme.colors.brandSecond.first}
                                cursor="pointer"
                                onClick={() => {
                                  setPostData(item)
                                  setModalUpdatePost(true)
                                }}
                              />
                            </ButtonIcon>

                            <ButtonIcon tooltip="Excluir postagem">
                              <Button
                                variant="unstyled"
                                display="flex"
                                alignItems="center"
                                colorScheme="red"
                                onClick={() => {
                                  setModalRemovePost(true)
                                  setPostId(item.id)
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </ButtonIcon>

                          </TD>
                        </TR>
                      ))}
                    </TBody>
                  </Table>
                </TableContainer>

                <Pagination
                  registerPerPage={registerPerPage}
                  totalRegisters={count}
                  currentPage={currentPage}
                  handleChangePage={(page) => setCurrentPage(page)}
                />
              </>
            )}

            {data.length === 0 && (
              <AlertNoDataFound title="Nenhuma postagem encontrada" />
            )}
          </>
        )}
      </Content>

      <SimpleModal
        title="Postagem"
        size="xl"
        isOpen={modalRecordPost}
        handleModal={setModalRecordProduct}
      >
        <ModalRecordPost
          handleClose={() => setModalRecordProduct(false)}
        />
      </SimpleModal>

      {postData && (
        <SimpleModal
          title="Postagem"
          size="xl"
          isOpen={modalUpdatePost}
          handleModal={setModalUpdatePost}
        >
          <ModalUpdatePost
            handleClose={() => setModalUpdatePost(false)}
            data={postData}
          />
        </SimpleModal>
      )}

      {modalRemovePost && (
        <AlertModal
          title="Remover postagem"
          question="Deseja realmente remover esta postagem?"
          request={onConfirmRemovePost}
          showModal={modalRemovePost}
          setShowModal={setModalRemovePost}
          size="md"
        ></AlertModal>
      )}
    </>
  );
};

export default PostsList;
