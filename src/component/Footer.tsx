import { ReactComponent as GithubSvg } from "../assets/icon/github.svg";
import { useStore } from "../hook";
import { Icon } from "./Icon";

export const Footer = () => {
  const { isDark } = useStore().store;
  return (
    <footer
      className={`footer items-center p-4 text-neutral-content ${
        isDark ? "bg-neutral" : ""
      }`}
    >
      <aside className="items-center grid-flow-col">
        <p className={isDark ? "" : "text-base-content"}>
          Copyright © 2024 - All right reserved
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/mhmad-nr" target="_blank">
          <Icon Element={GithubSvg} className="w-8 h-8" />
        </a>
      </nav>
    </footer>
  );
};
