import { Grid, Show, GridItem } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    // TODO: fix the sidebar
    // (actually I don't get the hell is happening here, so i just removed the box and flex compoenents leaving you the rest to fix.)
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <div className="pl-2">
          <GameHeading />
          <div className="flex mb-5">
            <div className="mr-5">
              <PlatformSelector />
            </div>
            <SortSelector />
          </div>
        </div>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
