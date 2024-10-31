import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Icons
import { MdOutlineMenu } from "react-icons/md";

// Components
import MenuDropDown from "./components/MenuDropDown";

// Styles
import {
  MenuWithLogo,
  MenuMainMobile,
  ButtonOpenMenuMobile,
  DrawerFooterMain,
} from "./styled";

const Menu = ({
  onBoardingCompleted = true,
}: {
  onBoardingCompleted?: boolean;
}) => {
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

                <DrawerFooterMain></DrawerFooterMain>
              </DrawerContent>
            </Drawer>
          </MenuMainMobile>
        )}

      </MenuWithLogo>

      <MenuDropDown />
    </>
  );
};

export default Menu;
