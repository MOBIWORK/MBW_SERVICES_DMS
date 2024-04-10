import { ReactNode } from "react";
import classNames from "classnames";

export function WrapperCard({ children, type = "card" }: { children: ReactNode | string, type?: "map" | "card" }) {
    return (
      <div className={classNames("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden", type == "card" && "p-4")} style={{ backgroundColor: '#FBFBFB', width: '100%'}}>
        {children}
      </div>
    );
  }

export function WrapperCardMap({ children, type = "card" }: { children: ReactNode | string, type?: "map" | "card" }) {
  return (
    <div className={classNames("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden", type == "card")} style={{ backgroundColor: '#FBFBFB', width: '100%'}}>
      {children}
    </div>
  );
}

export function WrapperCardTable({ children, type = "card" }: { children: ReactNode | string, type?: "map" | "card" }) {
  return (
      <div className={classNames("border border-solid border-[#DFE3E8] rounded-2xl overflow-hidden", type == "card")} style={{ backgroundColor: '#FBFBFB', width: '100%'}}>
        {children}
      </div>
  );
}