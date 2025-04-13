import CardGridPage from "@/modules/shared/ui/components/card-grid-page/CardGridPage";
import FriendCard from "@/modules/shared/ui/components/friend-card/FriendCard";
import friend1 from "../../../public/1.jpg";
import friend2 from "../../../public/2.jpg";
import friend3 from "../../../public/3.jpg";
import friend4 from "../../../public/4.jpg";
import friend5 from "../../../public/5.jpg";
import game from "../../../public/hogwarts-legacy.webp";
import hl1 from "../../../public/hl-1.jpg";
import hl2 from "../../../public/hl-2.jpg";
import { PiUsersDuotone } from "react-icons/pi";

const friends = [
  {
    id: 1,
    name: "John",
    img: friend1,
    game1: game,
    game2: hl1,
    game3: hl2,
  },
  {
    id: 2,
    name: "Eric",
    img: friend2,
    game1: game,
    game2: hl1,
    game3: hl2,
  },
  {
    id: 3,
    name: "Sarah",
    img: friend3,
    game1: game,
    game2: hl1,
    game3: hl2,
  },
  {
    id: 4,
    name: "Ian",
    img: friend4,
    game1: game,
    game2: hl1,
    game3: hl2,
  },
  {
    id: 5,
    name: "Joe",
    img: friend5,
    game1: game,
    game2: hl1,
    game3: hl2,
  },
];

export default function Friends() {
  return (
    <CardGridPage title={`Friends`} desc={`A hardcoded page showing youre friends and what they're currently playing`} icon={PiUsersDuotone}>
      {friends.map((f) => (
        <FriendCard key={f.id} img={f.img} name={f.name} game1={f.game1} game2={f.game2} game3={f.game3} />
      ))}
    </CardGridPage>
  );
}
