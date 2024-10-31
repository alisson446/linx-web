// Pages
import PostList from "../../pages/PostsList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <PostList />}
  </>
)

export default Section
