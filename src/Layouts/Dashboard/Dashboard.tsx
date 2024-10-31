// Styles
import { ComponentWrap, MenuWrap } from "./styled";

// types
import { IHome } from "./type";

const Home = ({ menu, children }: IHome) => {
  return (
    <ComponentWrap as="main">
      <MenuWrap as="header">{menu}</MenuWrap>
      {children}

      {/* company && <VideoPlayer /> */}
    </ComponentWrap>
  );
};

export default Home;
