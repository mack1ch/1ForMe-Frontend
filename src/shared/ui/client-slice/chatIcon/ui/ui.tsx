import Image from "next/image";
import Link from "next/link";
import Chat from "../../../../../../public/icons/clients/chat.svg";
import styles from "./ui.module.scss";
import { usePathname } from "next/navigation";
export const ChatIcon = ({ href }: { href: string }) => {
  const pathname = usePathname();
  return (
    <>
      <Link
        className={`${styles.icon} ${href == pathname ? styles.active : ""}`}
        href={href}
      >
        <Image src={Chat} width={22} height={22} alt="Инфо" />
      </Link>
    </>
  );
};
