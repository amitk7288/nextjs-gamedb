import { IconType } from "react-icons";
import { SiPlaystation, SiLinux, SiAtari, SiCommodore, SiSega } from "react-icons/si";
import { RiXboxFill, RiWindowsFill } from "react-icons/ri";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import nintendoLogo from "../../../../public/nintendo-logo.svg";
import webLogo from "../../../../public/web-logo.svg";
import iosLogo from "../../../../public/ios-logo.svg";
import threedoLogo from "../../../../public/threedo-logo.svg";
import neogeoLogo from "../../../../public/neogeo-logo.svg";

export const PlatformIcons: Record<string, IconType | string> = {
  PC: RiWindowsFill,
  PlayStation: SiPlaystation,
  Xbox: RiXboxFill,
  Linux: SiLinux,
  Atari: SiAtari,
  Commodore: SiCommodore,
  SEGA: SiSega,
  Android: AiFillAndroid,
  "Apple Macintosh": FaApple,
  iOS: iosLogo,
  Nintendo: nintendoLogo,
  "3DO": threedoLogo,
  NeoGeo: neogeoLogo,
  Web: webLogo,
};
