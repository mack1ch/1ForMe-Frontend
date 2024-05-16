import Image from "next/image";
import Link from "next/link";
import User from "../../../../../../public/icons/clients/userList.svg";
import styles from "./ui.module.scss";
import { usePathname } from "next/navigation";
export const ClientInfoIcon = ({ href }: { href: string }) => {
  const pathname = usePathname();
  return (
    <>
      <Link
        className={`${styles.icon} ${href == pathname ? styles.active : ""}`}
        href={href}
      >
        <Image src={User} width={22} height={22} alt="Инфо" />
      </Link>
    </>
  );
};
