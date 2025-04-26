"use client";

import React from "react";
import Image from "next/image";
import GenreTag from "@/modules/genres/ui/components/genre-tag/GenreTag";
import Achievement from "@/modules/game/ui/components/achievement/Achievement";
import CardGridSection from "@/modules/shared/ui/components/card-grid-section/CardGridSection";
import GameCard from "@/modules/game/ui/components/gamecard/GameCard";
import MetaInfo from "@/modules/game/ui/components/meta-info/MetaInfo";
import AddToCollection from "@/modules/shared/ui/components/add-to-collection/AddToCollection";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlatformIcons } from "@/modules/game/data/platformIcons";
import formatDate from "@/utils/formatDate";
import truncateText from "@/utils/truncateText";

import { useState, useEffect } from "react";
import { useFetchGame } from "@/hooks/useFetchGame";
import { useFetchAchievements } from "@/hooks/useFetchAchievements";
import { useFetchScreenshots } from "@/hooks/useFetchScreenshots";
import { useFetchDLCS } from "@/hooks/useFetchDLCS";
import { useFetchRelated } from "@/hooks/useFetchRelated";
import { useAuth } from "@clerk/nextjs";
import { useFavoritesStore } from "@/store/favStore";
import { useWishStore } from "@/store/wishStore";
import { useCollectionsStore } from "@/store/collectionStore";
import { RiBookmarkFill, RiHeart3Fill, RiHeart3Line, RiStarFill } from "react-icons/ri";
import { PiCalendarXDuotone, PiClockCountdownDuotone, PiCodeDuotone, PiGameControllerDuotone, PiMagicWand, PiMagicWandFill } from "react-icons/pi";
import { MdOutlineBookmarkAdd, MdOutlineCategory, MdOutlineDownload, MdOutlineGamepad, MdOutlineImage, MdOutlineSwipe } from "react-icons/md";
import { GrTrophy } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

import { Carousel, CarouselContent, CarouselItem } from "@/modules/shared/ui/components/shadcn-comps/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/modules/shared/ui/components/shadcn-comps/dialog";

interface GamePageParams {
  gameId: number | string;
}

export default function GamePage({ params }: { params: Promise<GamePageParams> }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const { userId, isSignedIn } = useAuth();
  const {checkGameInCollections} = useCollectionsStore();
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const resolvedParams = React.use(params);
  const { gameId } = resolvedParams;

  const { favIds, fetchFavorites, toggleFavorite } = useFavoritesStore();
    useEffect(() => {
      if (userId) {
        fetchFavorites(String(userId));
      }
    }, [userId, fetchFavorites]);

  const { wishIds, fetchWishes, toggleWishes } = useWishStore();
    useEffect(() => {
      if (userId) {
        fetchWishes(String(userId));
      }
    }, [userId, fetchWishes]);

  
  useEffect(() => {
    async function isGameSavedInCollection() {
      if (userId) {
        const savedData = await checkGameInCollections(String(userId), Number(gameId));
        setIsSave(savedData.isGameInAnyCollection);
      } else {
        setIsSave(false);
      }
    }
    isGameSavedInCollection();
  }, [checkGameInCollections, gameId, userId]);

  const {
    data: game,
    isLoading: isGameLoading,
    isError: isGameError,
    error: gameError,
  } = useFetchGame({
    gameId: gameId,
  });

  const {
    data: achievementsData,
    fetchNextPage,
    hasNextPage,
    isLoading: areAchievementsLoading,
    isError: isAchievementsError,
    error: achievementsError,
  } = useFetchAchievements({
    gameId: gameId,
  });

  const {
    data: screenshots,
    isLoading: areScreenshotsLoading,
    isError: isScreenshotsError,
    error: screenshotsError,
  } = useFetchScreenshots({
    gameId: gameId,
  });

  const {
    data: gameDLCS,
    isLoading: areDLCSLoading,
    isError: isDLCSError,
    error: dlcsError,
  } = useFetchDLCS({
    gameId: gameId,
  });

  const {
    data: gamesInSeries,
    isLoading: areRelatedLoading,
    isError: isRelatedLError,
    error: relatedError,
  } = useFetchRelated({
    gameId: gameId,
  });

  const isLoading = isGameLoading || areAchievementsLoading || areScreenshotsLoading || areDLCSLoading || areRelatedLoading;
  const isError = isGameError || isAchievementsError || isScreenshotsError || isDLCSError || isRelatedLError;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Loading: {gameError?.message || achievementsError?.message || screenshotsError?.message || dlcsError?.message || relatedError?.message}</p>;

  const handleFavClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (userId) toggleFavorite(String(userId), Number(gameId));
  };

  const handleWishClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (userId) toggleWishes(String(userId), Number(gameId));
  };

  const truncatedDesc = truncateText(game?.description_raw, 300);
  const truncatedDescXL = truncateText(game?.description_raw, 800);

  const handleReadMore = () => {
    setIsReadMore((prevState) => !prevState);
  }

  const achievements = achievementsData?.pages.flatMap((page) => page.results);
  const staticAchievements = achievementsData?.pages[0]?.results || [];


  return (
    <div className="flex flex-col gap-8 md:px-10">
      <h1 className="text-[60px] font-semibold leading-tight dark:text-white">{game?.name}</h1>
      <div className="xl:grid xl:grid-cols-2 xl:gap-6">
        <div className="flex flex-col gap-3">
          <div>
            {/* main image */}
            <div className="relative">
              <ul className="absolute left-2 top-2 flex flex-wrap gap-1">
                {game.genres.map((genre: { id: number; name: string }) => (
                  <GenreTag key={genre.id} genre={genre.name} />
                ))}
              </ul>
              <div className="relative aspect-video w-full">
                <Image src={game.background_image} alt={game.name} fill sizes="100vw" className="rounded-lg object-cover" />
              </div>
              {/* Icon Buttons */}
              <div className="absolute bottom-[10px] right-[10px] flex gap-[10px]">
                <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] text-white hover:border" onClick={handleFavClick}>
                  {favIds.includes(Number(gameId)) && isSignedIn ? <RiHeart3Fill className="text-red-500" /> : <RiHeart3Line />}
                </div>
                <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] text-white hover:border" onClick={handleWishClick}>
                  {wishIds.includes(Number(gameId)) && isSignedIn ? <PiMagicWandFill className="text-lime-500" /> : <PiMagicWand />}
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0} data-testid="save-button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#252f3f] text-[18px] hover:border">
                      {isSave && isSignedIn ? <RiBookmarkFill data-testid="savedGame" className="text-sky-500" /> : <MdOutlineBookmarkAdd data-testid="unsavedGame" className="text-xl text-white" />}
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="sr-only" />
                    <AddToCollection gameId={Number(gameId)} setIsDialogOpen={setIsDialogOpen} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* platforms and rating */}
          <div className="flex items-start justify-between">
            <ul className="xxs:grid-cols-5 xs:grid-cols-6 grid grid-cols-4 gap-2 sm:grid-cols-10">
              {game.parent_platforms?.map((p: { platform: { id: number; name: string; slug: string } }) => {
                const platformIcon = PlatformIcons[p.platform.name];

                return platformIcon ? (
                  <li key={p.platform.id} className="dark:border-drkbrd flex w-[38px] items-center justify-center rounded-md border border-[#e5e7eb] p-2">
                    {typeof platformIcon === "function" ? React.createElement(platformIcon, { className: "text-[20px]" }) : <Image src={platformIcon as string} alt={p.platform.name} width={38} height={38} />}
                  </li>
                ) : null;
              })}
            </ul>
            <div className="xs:text-lg flex h-[fit-content] items-center justify-end gap-[5px] font-medium md:text-xl 2xl:text-2xl">
              <p>Rating:</p>
              <p>{game?.metacritic}</p>
              <div className="flex items-center justify-center">
                <RiStarFill className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
        {/* info */}
        <div id="desc" className="mt-6 xl:mt-0">
          <p className="mb-2 text-2xl font-medium dark:text-white 2xl:text-3xl">About</p>
          <div>
            <div>
              <p className="3xl:text-xl 3xl:font-extralight block font-light 2xl:hidden">{isReadMore ? game.description_raw : truncatedDesc}</p>
              <p className="3xl:text-xl 3xl:font-extralight hidden font-light 2xl:block">{isReadMore ? game.description_raw : truncatedDescXL}</p>
              <button onClick={handleReadMore} className="bg-drkbg2 dark:bg-drkcol dark:text-drkbg2 mt-3 cursor-pointer rounded-md px-2 py-0.5 text-white">
                {isReadMore ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* secondary image */}
        <div className="relative aspect-video w-full 2xl:hidden">
          <Image src={game.background_image_additional} alt={game.name} fill sizes="100vw" className="rounded-lg" />
        </div>
        {/* meta info */}
        <div className="flex h-full flex-col">
          <div>
            <div className="mb-2 flex items-center gap-2 dark:text-white">
              <MdOutlineCategory className="text-2xl xl:text-3xl" />
              <p className="text-2xl font-medium 2xl:text-3xl">Stats</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 xl:h-fit xl:grid-rows-1 2xl:grid-cols-4">
              <MetaInfo icon={PiClockCountdownDuotone} name={`Avg Playtime: `} value={`${game.playtime} ${game.playtime > 1 ? `hrs` : `hr`}`} />
              <MetaInfo icon={PiCalendarXDuotone} name={`Released: `} value={formatDate({ dateStr: game.released })} />
              <MetaInfo icon={PiGameControllerDuotone} name={`Publisher: `} value={game.publishers?.[0]?.name || "Unknown"} />
              <MetaInfo icon={PiCodeDuotone} name={`Developer: `} value={game.developers?.[0]?.name || "Unknown"} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2 dark:text-white">
        <MdOutlineImage className="text-2xl xl:text-3xl" />
        <p className="text-2xl font-medium 2xl:text-3xl">Screenshots</p>
      </div>
      <Carousel>
        <CarouselContent className="-ml-4">
          {screenshots?.results.map((i: { image: string; id: number }) => (
            <CarouselItem key={i.id} className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 2xl:basis-1/4">
              <div className="relative aspect-video w-full">
                <Image className="scale-95 rounded-lg" src={i.image} alt={`Screenshot ${i.id}`} fill sizes="100vw" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex justify-center text-2xl xl:text-3xl">
        <MdOutlineSwipe />
      </div>

      {achievements && (
        <div>
          <div className="mb-2 flex items-center gap-2 dark:text-white">
            <GrTrophy className="text-xl xl:text-2xl" />
            <p className="text-2xl font-medium 2xl:text-3xl">Achievements ({achievementsData?.pages[0]?.count})</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {staticAchievements?.map((a: { id: number; image: string; name: string; percent: string; description: string }) => (
              <Achievement key={a.id} img={a.image} name={a.name} progress={a.percent} desc={a.description} />
            ))}
            <div className="dark:border-drkbrd flex items-center gap-3 rounded-md border border-[#e5e7eb] p-1">
              <Dialog>
                <DialogTrigger>
                  <div className="flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-md bg-[#202020] text-white transition-all duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-[white] dark:hover:text-black">
                    <BsThreeDots className="text-3xl" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col gap-2">
                    <DialogHeader>
                      <DialogTitle>
                        <p className="xs:text-2xl text-xl font-medium dark:text-white">All Achievements</p>
                      </DialogTitle>
                    </DialogHeader>
                    <InfiniteScroll dataLength={achievementsData?.pages.flatMap((page) => page.results).length || 0} hasMore={hasNextPage} next={fetchNextPage} loader={<p className="text-center">Loading...</p>} height={400} endMessage={<p className="mt-3 text-center font-light">That&apos;s the lot!</p>}>
                      <div className="grid grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
                        {achievements?.map((a: { id: number; image: string; name: string; percent: string; description: string }) => (
                          <Achievement key={a.id} img={a.image} name={a.name} progress={a.percent} desc={a.description} />
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                </DialogContent>
              </Dialog>
              <div>
                <p className="font-medium dark:text-white">See all achievements</p>
                <p className="text-xs font-extralight dark:text-white/[.50]">{achievementsData?.pages[0]?.count} items</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameDLCS && gameDLCS.results.length !== 0 ? (
        <CardGridSection title={`DLC's for this game`} icon={MdOutlineDownload}>
          {gameDLCS?.results.map(
            (i: {
              id: string;
              background_image: string;
              name: string;
              metacritic: number;
              genres: { name: string }[];
              slug: string;
              parent_platforms: {
                platform: {
                  id: number;
                  name: string;
                  slug: string;
                };
              }[];
            }) => (
              <GameCard
                key={i.id}
                id={i.id}
                img={i.background_image}
                title={i.name}
                rating={i.metacritic}
                genre={i.genres[0]?.name}
                slug={i.slug}
                parentPlatforms={i.parent_platforms}
                isFav={favIds.includes(Number(i.id))}
                onFavClick={(gameId: number) => {
                  if (userId) toggleFavorite(String(userId), gameId);
                }}
                isWish={wishIds.includes(Number(i.id))}
                onWishClick={(gameId: number) => {
                  if (userId) toggleWishes(String(userId), gameId);
                }}
              />
            )
          )}
        </CardGridSection>
      ) : null}

      {gamesInSeries && gamesInSeries.results.length !== 0 ? (
        <CardGridSection title={`Other games in this series`} icon={MdOutlineGamepad}>
          {gamesInSeries.results.map(
            (i: {
              id: string;
              background_image: string;
              name: string;
              metacritic: number;
              genres: { name: string }[];
              slug: string;
              parent_platforms: {
                platform: {
                  id: number;
                  name: string;
                  slug: string;
                };
              }[];
            }) => (
              <GameCard
                key={i.id}
                id={i.id}
                img={i.background_image}
                title={i.name}
                rating={i.metacritic}
                genre={i.genres[0]?.name}
                slug={i.slug}
                parentPlatforms={i.parent_platforms}
                isFav={favIds.includes(Number(i.id))}
                onFavClick={(gameId: number) => {
                  if (userId) toggleFavorite(String(userId), gameId);
                }}
                isWish={wishIds.includes(Number(i.id))}
                onWishClick={(gameId: number) => {
                  if (userId) toggleWishes(String(userId), gameId);
                }}
              />
            )
          )}
        </CardGridSection>
      ) : null}
    </div>
  );
}
