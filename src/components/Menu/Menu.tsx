import {
  useTheme,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

// Icons
import { MdOutlineMenu } from "react-icons/md";

// Components
import MenuDropDown from "./components/MenuDropDown";

// Styles
import {
  MenuWithLogo,
  Logo,
  MenuMainMobile,
  ButtonOpenMenuMobile,
  LogoMobile,
  DrawerHeaderMain,
  DrawerFooterMain,
} from "./styled";

const Menu = ({
  onBoardingCompleted = true,
}: {
  onBoardingCompleted?: boolean;
}) => {
  const theme = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuWithLogo>
        {onBoardingCompleted && (
          <MenuMainMobile>
            <ButtonOpenMenuMobile onClick={onOpen}>
              <MdOutlineMenu size={20} />
            </ButtonOpenMenuMobile>

            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeaderMain>
                  <Link to="/">
                    <LogoMobile backgroundImage={theme.images.logo}>
                      {theme.content.project}
                    </LogoMobile>
                  </Link>
                </DrawerHeaderMain>

                <DrawerFooterMain></DrawerFooterMain>
              </DrawerContent>
            </Drawer>
          </MenuMainMobile>
        )}

        <Link
          to="/"
        >
          <Logo backgroundImage={theme.images.logo}>
            {theme.content.project}
          </Logo>
        </Link>

      </MenuWithLogo>

      <MenuDropDown />
    </>
  );
};

export default Menu;
